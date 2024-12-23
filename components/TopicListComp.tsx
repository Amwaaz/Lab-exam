import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

interface Props {
  category: string; // The category passed from the previous screen
  onTopicPress: (type: string) => void; // Function for further navigation
}

const TopicListComp: React.FC<Props> = ({ category, onTopicPress }) => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const q = query(collection(db, "Details"), where("category", "==", category));
        const querySnapshot = await getDocs(q);
        const fetchedTopics = [];
        querySnapshot.forEach((doc) => {
          fetchedTopics.push({ id: doc.id, ...doc.data() });
        });

        setTopics(fetchedTopics);
      } catch (error) {
        console.error("Error fetching topics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, [category]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  if (!topics.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No topics found for {category}.</Text>
      </View>
    );
  }

  const renderTopic = ({ item }: { item: { id: string; name: string; image: string; type: string; desc: string; price: string; rating: string; sellername: string } }) => (
    <TouchableOpacity
      style={styles.topicTile}
      onPress={() => onTopicPress(item.type)} // Pass `item.type` to `onTopicPress`
    >
      <Image source={{ uri: item.image }} style={styles.topicImage} />
      <View style={styles.topicContent}>
        <Text style={styles.topicName}>{item.name}</Text>
        <Text style={styles.topicPrice}>Price: {item.price}</Text>
        <Text style={styles.topicDetails}>{item.details}</Text>
        <Text style={styles.topicRating}>Rating: {item.rating}</Text>
        <Text style={styles.topicSeller}>Seller: {item.sellername}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{category} Items</Text>
      <FlatList
        data={topics}
        keyExtractor={(item) => item.id}
        renderItem={renderTopic}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#000",
    padding: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
  },
  listContainer: {
    width: "100%",
    alignItems: "center",
  },
  topicTile: {
    //width: "90%", // Wider tiles
    backgroundColor: "#1c1c1c",
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  topicImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
    resizeMode: "cover",
  },
  topicContent: {
    alignItems: "center",
  },
  topicName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  topicPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 5,
  },
  topicDetails: {
    fontSize: 14,
    color: "#DDD",
    marginBottom: 5,
    textAlign: "center",
  },
  topicRating: {
    fontSize: 14,
    color: "#FFD700",
    marginBottom: 5,
  },
  topicSeller: {
    fontSize: 14,
    color: "#FFF",
  },
});

export default TopicListComp;
