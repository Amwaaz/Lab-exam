import SignUpComponent from "@/components/SIGNUPcomp";
import React from "react";
import { View, StyleSheet, ImageBackground, Text } from "react-native";

export default function SignUpHomeScreen() {
  return (
    <ImageBackground
      source={require("@/assets/images/study1.jpg")} // Replace with your image path
      style={styles.background}
    >
      <View style={styles.container}>
        <SignUpComponent />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1, // Ensures the background image covers the entire screen
    resizeMode: "cover", // Makes the image cover the whole area
  },
  container: {
    flex: 1,
    padding: 10,
  },
});