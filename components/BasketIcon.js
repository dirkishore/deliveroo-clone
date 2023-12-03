import { View, Text } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectBasketItems, selectBasketTotal } from "../features/basketSlice";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Currency from "react-currency-formatter";

const BasketIcon = () => {
  const items = useSelector(selectBasketItems);
  const navigation = useNavigation();
  const basketTotal = useSelector(selectBasketTotal);

  const navigateToBasketScreen = () => {
    navigation.navigate("Basket");
  };

  if (items.length === 0) return null;

  return (
    <View className="absolute bottom-10 w-full z-10">
      <TouchableOpacity
        className="bg-[#00bbcc] mx-5 flex-row justify-between p-4 rounded-lg items-center shadow-md"
        onPress={navigateToBasketScreen}
      >
        <Text className="text-white text-lg font-extrabold bg-[#01A296] py-1 px-2 rounded-sm">
          {items.length}
        </Text>
        <Text className="text-white font-extrabold text-lg">View Basket</Text>
        <Text className="text-white font-extrabold text-lg">
          <Currency quantity={basketTotal} currency="INR" />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketIcon;
