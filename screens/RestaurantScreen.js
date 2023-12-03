import { View, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useLayoutEffect, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../sanity";
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  QuestionMarkCircleIcon,
} from "react-native-heroicons/solid";
import { StarIcon } from "react-native-heroicons/solid";
import { Text } from "react-native";
import { MapPinIcon } from "react-native-heroicons/outline";
import DishRow from "../components/DishRow";
import BasketIcon from "../components/BasketIcon";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../features/restaurentSlice";

const RestaurantScreen = () => {
  const navigation = useNavigation();
  const {
    params: {
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
    },
  } = useRoute();

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  useEffect(() => {
    dispatch(
      setRestaurant({
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
    );
  }, []);

  return (
    <>
      <BasketIcon />
      <ScrollView>
        <View className="relative">
          <Image
            source={{ uri: urlFor(imgUrl).url() }}
            className="w-full h-56"
          />
          <TouchableOpacity
            onPress={navigation.goBack}
            className="absolute top-10 left-5 bg-gray-100 p-2 rounded-full"
          >
            <ArrowLeftIcon color={"#00ccbb"} size={18} />
          </TouchableOpacity>
        </View>

        <View className="bg-white">
          <View className="px-4 pt-3">
            <Text className="text-xl font-bold">{title}</Text>
            <View className="flex-row my-1 space-x-2 items-center">
              <View className="flex-row items-center space-x-1">
                <StarIcon color={"green"} opacity={0.5} size={18} />
                <Text className="text-xs text-gray-500">
                  <Text className="text-green-500">{rating}</Text> &#183;{" "}
                  {genre}
                </Text>
              </View>

              <View className="flex-row items-center space-x-1">
                <MapPinIcon color={"gray"} opacity={0.7} size={18} />
                <Text className="text-xs text-gray-500">
                  Nearby &#183; {address}
                </Text>
              </View>
            </View>
            <Text className="text-xs text-gray-500 pb-4">
              {short_description}
            </Text>
          </View>

          <TouchableOpacity className="flex-row items-center space-x-2 border-y border-gray-300 p-4">
            <QuestionMarkCircleIcon color={"gray"} size={20} opacity={0.6} />
            <Text className="font-bold text-sm flex-1">
              Have a food allergy?
            </Text>
            <ChevronRightIcon color={"#00ccbb"} size={18} />
          </TouchableOpacity>
        </View>

        <View>
          <Text className="px-4 font-bold text-xl pt-3 mb-3">Menu</Text>

          {dishes.map((dish) => (
            <DishRow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              price={dish.price}
              short_description={dish.short_description}
              image={urlFor(dish.image).url()}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default RestaurantScreen;
