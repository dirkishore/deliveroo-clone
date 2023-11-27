import { View, Text, Image, TextInput, ScrollView } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AdjustmentsVerticalIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";

import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import sanityClient from "../sanity";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type=='featured']{
      ...,
      restaurant[]->{
        ...,
        dishes[]->
      }
    }`
      )
      .then((res) => {
        setFeaturedCategories(res);
      });
  }, []);

  return (
    <SafeAreaView className=" flex-1">
      <View className="flex-row items-center space-x-2 pb-3 mx-4">
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzHMDlwRCHOHZP_tX7jRYNxV8W8MpNEog45w&usqp=CAU",
          }}
          className="h-10 rounded-full w-10"
        />
        <View>
          <Text className="text-xs text-gray-400 font-bold ">Deliver Now!</Text>
          <View className="flex-row items-center">
            <Text className="font-bold text-xl">Current location</Text>
            <ChevronDownIcon color={"#00ccbb"} size={20} />
          </View>
        </View>
      </View>

      {/* Search */}
      <View className="flex-row items-center space-x-2 pb-3 mx-4">
        <View className="flex-row space-x-2 bg-gray-200 p-3 flex-1">
          <MagnifyingGlassIcon color={"#000"} />
          <TextInput placeholder="Restaurants and cuisines" />
        </View>
        <AdjustmentsVerticalIcon color={"#00ccbb"} />
      </View>

      {/* body */}

      <ScrollView
        className="bg-gray-100 px-4"
        showsVerticalScrollIndicator={false}
      >
        <Categories />

        {featuredCategories.map((category) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
