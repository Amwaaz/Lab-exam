import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";

// Tab Bar Icon Component
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#6cb2eb", // Active tab color
        tabBarInactiveTintColor: "#a9a9a9", // Inactive tab color
        headerShown: true,
      }}
    >
      {/* Home Tab */}
      <Tabs.Screen
        name="index" // Name of the file
        options={{
          title: "Home", // Header and tab title
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerTitleAlign: "center",
        }}
      />

      {/* Profile Tab */}
      <Tabs.Screen
        name="Profile" // Name of the file (Profile.tsx in (tabs) folder)
        options={{
          title: "Profile", // Header and tab title
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          headerTitleAlign: "center",
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
