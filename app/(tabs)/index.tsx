import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import HomeScreenComp from "@/components/HomeScreenCom";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      
      <View>
        <Text style={styles.title}>Welcome to our Market Place App</Text>

        <View style={styles.extra}>
          <Text style={styles.extraText}>
            We offer a wide range of things for all ages
          </Text>
          
        </View>

        <HomeScreenComp />

      </View>


    </View>
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
    textAlign: "center",
    color:'white'
  },
  extra: {
    marginTop: 20,
    alignItems: "center", // Center text block
    paddingHorizontal: 20,
    marginBottom:40
  },
  extraText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
    color:'white'
  },
  tile: {

    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    elevation: 3,
    padding: 10,
    margin: 10,
    width: "40%",

  },
  tileImage: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    borderRadius: 70
  },
  tileText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
});
