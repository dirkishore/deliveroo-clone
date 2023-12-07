import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurentSlice";
import { TouchableOpacity } from "react-native-gesture-handler";
import { XCircleIcon, XMarkIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import * as Progress from "react-native-progress";

const DeliveryScreen = () => {
  const restaurant = useSelector(selectRestaurant);
  const navigation = useNavigation();

  return (
    <SafeAreaView className="bg-[#00ccbb] flex-1">
      <View className="flex-row items-center justify-between p-5">
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <XMarkIcon color={"white"} size={30} />
        </TouchableOpacity>
        <Text className="font-light text-white text-base">Order Help?</Text>
      </View>

      <View className="bg-white mx-5 my-2 p-5 rounded-md shadow-md z-10">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-lg text-gray-500">Estimate Arrival</Text>
            <Text className="font-bold text-2xl">45 - 50 Minutes</Text>
          </View>
          <Image
            source={{ uri: "https://links.papareact.com/fls" }}
            className="h-20 w-20"
          />
        </View>
        {/* <Progress.Bar indeterminate={1} /> */}

        <Text className="text-gray-500">Your Order is being prepared!</Text>
      </View>

      <MapView
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.long,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        className="flex-1 -mt-10"
        mapType="mutedStandard"
      >
        <Marker
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.long,
          }}
          title={restaurant.title}
          description={restaurant.short_description}
          identifier="origin"
          pinColor="#00ccbb"
        />
      </MapView>

      <View className="bg-white flex-row items-center space-x-3 px-5 py-4">
        <Image
          source={{ uri: "https://links.papareact.com/wru" }}
          className="h-12 w-12 rounded-full"
        />
        <View className="flex-1">
          <Text className="text-lg">Kamalesh</Text>
          <Text className="text-gray-400">Your Rider</Text>
        </View>

        <Text className="text-[#00ccbb] text-lg font-bold">Call</Text>
      </View>
    </SafeAreaView>
  );
};

export default DeliveryScreen;
