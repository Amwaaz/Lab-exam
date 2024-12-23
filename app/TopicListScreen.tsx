import React from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import TopicListComp from "@/components/TopicListComp";

export default function TopicListScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { category } = route.params; // Get the selected category from navigation

  const handleTopicPress = (type: string) => {
    console.log(`Navigating to topic with type: ${type}`);
    //navigation.navigate("TopicDetailScreen", { type }); // Pass correct type
  };
  
  

  return <TopicListComp category={category} onTopicPress={handleTopicPress} />;
}
