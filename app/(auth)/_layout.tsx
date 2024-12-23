import React from "react";
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      {/* Default route: Login screen */}
      <Stack.Screen
        name="index"
        options={{
          title: "Login",
          headerShown: false, // Hide the header for a cleaner login UI
        }}
      />
      {/* Route for Signup screen */}
      <Stack.Screen
        name="Signup"
        options={{
          title: "Sign Up",
          headerShown: true, // Show header for the signup page
        }}
      />
    </Stack>
  );
}
