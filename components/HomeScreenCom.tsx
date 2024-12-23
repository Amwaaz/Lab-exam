import { useNavigation } from "expo-router";
import React from "react";
import { View, Text, Image, StyleSheet, Pressable, ScrollView } from "react-native";

const HomeScreenComp = () => {
  const navigation = useNavigation();

  const handlePressCategory = (category: string) => {
    navigation.navigate("TopicListScreen", { category }); // Pass the selected category to TopicListScreen
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.column}>
        <Pressable onPress={() => handlePressCategory("Furniture")} style={styles.item}>
          <Image source={require("@/assets/images/furniture.jpg")} style={styles.image} />
          <Text style={styles.itemText}>Furniture</Text>
        </Pressable>

        <Pressable onPress={() => handlePressCategory("Phones")} style={styles.item}>
          <Image source={require("@/assets/images/phones.jpg")} style={styles.image} />
          <Text style={styles.itemText}>Phones</Text>
        </Pressable>

        <Pressable onPress={() => handlePressCategory("Tablets")} style={styles.item}>
          <Image source={require("@/assets/images/tablets.jpg")} style={styles.image} />
          <Text style={styles.itemText}>Tablets</Text>
        </Pressable>

        <Pressable onPress={() => handlePressCategory("Accessories")} style={styles.item}>
          <Image source={require("@/assets/images/accessories.jpg")} style={styles.image} />
          <Text style={styles.itemText}>Accessories</Text>
        </Pressable>

        {/* Additional Categories */}
        <Pressable onPress={() => handlePressCategory("Clothing")} style={styles.item}>
          <Image source={require("@/assets/images/clothing.jpg")} style={styles.image} />
          <Text style={styles.itemText}>Clothing</Text>
        </Pressable>

        <Pressable onPress={() => handlePressCategory("Shoes")} style={styles.item}>
          <Image source={require("@/assets/images/shoes.jpg")} style={styles.image} />
          <Text style={styles.itemText}>Shoes</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  column: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 10,
  },
  item: {
    alignItems: "center",
    backgroundColor: "gray",
    borderRadius: 20,
    elevation: 3,
    padding: 10,
    margin: 10,
    width: "40%",
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    borderRadius: 70,
  },
  itemText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginTop: 10,
  },
});

export default HomeScreenComp;
