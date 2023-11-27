import { View, Text, Image } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { urlFor } from "../sanity";

const CategoryCard = ({ imgUrl, title }) => {
  return (
    <TouchableOpacity className="relative">
      <Image
        source={{ uri: urlFor(imgUrl).url() }}
        className="h-20 w-20 rounded"
      />
      <Text className="text-xs absolute bottom-1 left-1 text-white font-bold">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
