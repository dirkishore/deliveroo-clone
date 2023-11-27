import { View, Text, Image } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StarIcon } from "react-native-heroicons/solid";
import { MapPinIcon } from "react-native-heroicons/outline";
import { urlFor } from "../sanity";
import { useNavigation } from "@react-navigation/native";

const RestaurantCard = ({
  id,
  imgUrl,
  title,
  rating,
  genre,
  address,
  short_description,
  dishes,
  long,
  lat,
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Restaurant", {
          id,
          imgUrl,
          title,
          rating,
          genre,
          address,
          short_description,
          dishes,
          long,
          lat,
        })
      }
      className="bg-white rounded-sm shadow-sm"
    >
      <Image
        source={{
          uri: urlFor(imgUrl).url(),
        }}
        className="w-64 h-36 rounded-sm"
      />
      <View className="px-3 pb-4">
        <Text className="text-lg font-bold pt-2">{title}</Text>
        <View className="flex-row items-center space-x-1">
          <StarIcon color={"green"} opacity={0.5} size={20} />
          <Text className="text-sm text-gray-500">
            <Text className="text-green-500">{rating}</Text> &#183; {genre}
          </Text>
        </View>

        <View className="flex-row items-center space-x-1 mt-1">
          <MapPinIcon color={"gray"} size={20} opacity={0.5} />
          <Text className="text-sm text-gray-500">Nearby &#183; {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
