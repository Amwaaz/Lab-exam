import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "@/config/firebaseConfig"; // Import Firebase config
import { useColorScheme } from "@/components/useColorScheme";
import { View, ActivityIndicator } from "react-native";

export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [profileChecked, setProfileChecked] = useState(false);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded && authChecked && profileChecked) {
      SplashScreen.hideAsync();
    }
  }, [loaded, authChecked, profileChecked]);

  // Step 2: Check authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthChecked(true);

      // Step 3: If user is authenticated, check profile
      if (currentUser) {
        checkUserProfile(currentUser.uid);
      } else {
        setProfileChecked(true); // If no user, profile check is complete
      }
    });

    return unsubscribe;
  }, []);

  // Step 3: Check profile existence in Firestore
  const checkUserProfile = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        console.log("Profile exists:", userDoc.data());
      } else {
        console.log("Profile does not exist.");
      }
      setProfileChecked(true);
    } catch (error) {
      console.error("Error checking user profile:", error);
      setProfileChecked(true); // Avoid blocking the app
    }
  };

  // Step 4: Loading state
  if (!authChecked || !loaded || !profileChecked) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  return user ? <UserLayoutNav /> : <AuthLayoutNav />;
}

function UserLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(zContent)" options={{ headerShown: false }} />
        <Stack.Screen name="TopicListScreen" options={{ headerShown: false }} />
        <Stack.Screen name="TopicDetailScreen" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}

function AuthLayoutNav() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}