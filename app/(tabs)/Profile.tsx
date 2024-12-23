import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ImageBackground,
} from "react-native";

export default function ProfileScreen() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [paymentDetails, setPaymentDetails] = useState("");
  const [preferences, setPreferences] = useState("");

  const handleSave = () => {
    if (!name || !address || !paymentDetails || !preferences) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    Alert.alert("Profile Saved", "Your profile has been updated successfully.");
  };

  return (
    <ImageBackground
      source={require("@/assets/images/study.jpg")} // Replace with your image path
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Profile Setup</Text>

        {/* Input Fields with Icons */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#ddd"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your address"
            placeholderTextColor="#ddd"
            value={address}
            onChangeText={setAddress}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Payment Details</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter payment details"
            placeholderTextColor="#ddd"
            value={paymentDetails}
            onChangeText={setPaymentDetails}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Preferences</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter preferences"
            placeholderTextColor="#ddd"
            value={preferences}
            onChangeText={setPreferences}
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
  },
  heading: {
    fontSize: 32,
    color: "#f78cd6",
    fontWeight: "bold",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 5,
    marginBottom: 30,
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 8,
    fontWeight: "600",
  },
  input: {
    width: "100%",
    backgroundColor: "#222",
    color: "#fff",
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
  },
  button: {
    marginTop: 30,
    backgroundColor: "#4A90E2",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
