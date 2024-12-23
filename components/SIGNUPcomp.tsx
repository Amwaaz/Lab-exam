import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
  Modal,
} from "react-native";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { auth } from "@/config/firebaseConfig";
import { useNavigation } from "expo-router";

const SignUpComponent: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const navigation = useNavigation();

  const signUp = async () => {
    if (!email || !password || !username) {
      Alert.alert("Please fill in all fields.");
      return;
    }

    if (username.length > 25) {
      Alert.alert("Error", "Username should not exceed 25 characters.");
      return;
    }

    setLoading(true);
    setModalVisible(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User signed up successfully:", user.uid);

      await updateProfile(user, { displayName: username });

      const db = getFirestore();
      const userDocRef = doc(db, "users", user.uid);

      await setDoc(userDocRef, {
        username,
        email,
      });

      console.log("User data saved in Firestore");

      setModalVisible(false);
      navigation.replace("(tabs)"); // Navigate to user area
    } catch (error: any) {
      console.error("Sign-up error:", error);
      Alert.alert("Error", error.message);
      setModalVisible(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.appName}>SAFINA</Text>
      <View style={styles.card}>
        <Text style={styles.heading}>Create Account</Text>

        {/* Username Input */}
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#ddd"
          value={username}
          onChangeText={(text) =>
            text.length <= 25
              ? setUsername(text)
              : Alert.alert(
                  "Error",
                  "Username should not exceed 25 characters."
                )
          }
        />

        {/* Email Input */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#ddd"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        {/* Password Input */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder="Password"
            placeholderTextColor="#ddd"
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Text style={styles.eyeText}>
              {isPasswordVisible ? "Hide" : "Show"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={signUp}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Navigate to Login */}
      <View style={styles.switchTextContainer}>
        <Text style={styles.switchText}>
          Already have an account?{" "}
          <Text
            style={styles.switchLink}
            onPress={() => navigation.navigate("index")}
          >
            Sign In
          </Text>
        </Text>
      </View>

      {/* Modal for Loading */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ActivityIndicator size="large" color="#f78cd6" />
            <Text style={styles.modalText}>
              Creating account, please wait...
            </Text>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  appName: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#4A4E69",
    marginBottom: 40,
    textAlign: "center",
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#4A4E69",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 20,
    padding: 30,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    marginBottom: 25,
    width: "90%",
    alignSelf: "center",
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    fontSize: 16,
    color: "#333",
  },
  passwordContainer: { position: "relative", width: "100%" },
  passwordInput: { paddingRight: 60 },
  eyeIcon: { position: "absolute", right: 15, top: 15 },
  eyeText: {
    color: "#4A90E2",
    fontSize: 14,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#f78cd6",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  switchTextContainer: {
    marginTop: 20,
    alignSelf: "center",
  },
  switchText: {
    fontSize: 16,
    color: "#fff",
  },
  switchLink: {
    color: "#4A90E2",
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
});

export default SignUpComponent;
