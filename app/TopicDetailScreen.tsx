import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig"; // Adjust the import to match your project structure
import { FontAwesome } from "@expo/vector-icons";

export default function TopicDetailScreen() {
  const route = useRoute();
  const { topicId } = route.params; // Passed from TopicListScreen
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const docRef = doc(db, "Details", topicId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setDetail({ id: docSnap.id, ...docSnap.data() });
        } else {
          Alert.alert("Error", "No such document exists.");
        }
      } catch (error) {
        Alert.alert("Error", "Failed to fetch the detail.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [topicId]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  if (!detail) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No details found for this item.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.detailCard}>
        <TouchableOpacity style={styles.favoriteIcon}>
          <FontAwesome name="heart-o" size={24} color="#FF0000" />
        </TouchableOpacity>
        <Image source={{ uri: detail.image }} style={styles.image} />
        <Text style={styles.name}>{detail.name}</Text>
        <Text style={styles.details}>{detail.details}</Text>
        <Text style={styles.price}>Price: {detail.price}</Text>
        <Text style={styles.rating}>Rating: {detail.rating}</Text>
        <Text style={styles.seller}>Seller: {detail.sellername}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  detailCard: {
    backgroundColor: "#1c1c1c",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  favoriteIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
    resizeMode: "cover",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
    color: "#DDD",
    marginBottom: 10,
    textAlign: "center",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 10,
  },
  rating: {
    fontSize: 16,
    color: "#FFD700",
    marginBottom: 10,
  },
  seller: {
    fontSize: 16,
    color: "#FFF",
  },
});
