import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from "../features/basketSlice";
import { selectRestaurant } from "../features/restaurentSlice";
import { useNavigation } from "@react-navigation/native";
import { XCircleIcon } from "react-native-heroicons/solid";
import { urlFor } from "../sanity";
import Currency from "react-currency-formatter";

const BasketScreen = () => {
  const navigation = useNavigation();
  const items = useSelector(selectBasketItems);
  const restaurant = useSelector(selectRestaurant);
  const total = useSelector(selectBasketTotal);
  const dispatch = useDispatch();

  const [groupedItemInBasket, setGroupedItemInBasket] = useState([]);

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});

    setGroupedItemInBasket(groupedItems);

    console.log(restaurant);
  }, [items]);

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-slate-100">
        <View className="bg-white p-2 shadow-lg rounded-md mx-3 mt-2">
          <View>
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-gray-400 text-center">
              {restaurant.title}
            </Text>
          </View>

          <TouchableOpacity
            onPress={navigation.goBack}
            className="absolute right-3 top-3 z-10"
          >
            <XCircleIcon color={"#00bbcc"} height={38} width={38} />
          </TouchableOpacity>
        </View>

        <View className="bg-white flex-row my-5 px-4 py-3 items-center mx-3 rounded-md space-x-2">
          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzHMDlwRCHOHZP_tX7jRYNxV8W8MpNEog45w&usqp=CAU",
            }}
            className="h-7 w-7 rounded-full"
          />
          <Text className="flex-1">Deliver in 50 - 60 min</Text>
          <TouchableOpacity>
            <Text className="text-[#00bbcc] ">change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {Object.entries(groupedItemInBasket).map(([key, item]) => {
            return (
              <View
                key={key}
                className="flex-row items-center mb-2 mx-3 space-x-3 bg-white py-2 px-3 rounded-sm"
              >
                <Text className="text-[#00bbcc]">{item?.length}x</Text>
                <Image
                  source={{ uri: urlFor(item[0]?.image).url() }}
                  className="h-12 w-12 rounded-full"
                />
                <Text className="flex-1">{item[0]?.name}</Text>
                <Text className="text-gray-600">
                  <Currency
                    quantity={item.reduce(
                      (total, item) => (total += item.price),
                      0
                    )}
                    currency="INR"
                  />
                </Text>
                <TouchableOpacity
                  onPress={() => dispatch(removeFromBasket({ id: key }))}
                >
                  <Text className="text-[#00bbcc] text-sm">remove</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>

        <View className="bg-white p-4 mt-2 space-y-1 rounded-md">
          <View className="flex-row justify-between ">
            <Text className="text-gray-400">SubTotal</Text>
            <Text className="text-gray-400">
              <Currency quantity={total} currency="INR" />
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-400">Delivery Fee</Text>
            <Text className="text-gray-400">
              <Currency quantity={40} currency="INR" />
            </Text>
          </View>

          <View className="flex-row justify-between mb-3">
            <Text className="text-black font-bold">Order Total</Text>
            <Text className="text-black font-bold">
              <Currency quantity={total + 40} currency="INR" />
            </Text>
          </View>

          <TouchableOpacity
            className="bg-[#00bbcc] p-3 rounded-lg"
            onPress={() => navigation.navigate("PreparingOrderScreen")}
          >
            <Text className="text-center text-lg font-bold text-white">
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
