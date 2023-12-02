import { View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import React, { useState } from "react";
import Currency from "react-currency-formatter";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItems,
  selectBasketItemsWithId,
} from "../features/basketSlice";

const DishRow = ({ id, name, price, short_description, image }) => {
  const [isPressed, setIsPressed] = useState(false);
  const dispatch = useDispatch();
  const items = useSelector((state) => selectBasketItemsWithId(state, id));

  const addItemsToBasket = () => {
    dispatch(addToBasket({ id, name, price, short_description, image }));
  };

  const removeItemsFromBasket = () => {
    if (!items.length > 0) return;
    dispatch(removeFromBasket({ id }));
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPressed(!isPressed)}
        className={`px-4 flex-row items-center bg-white py-2 border border-gray-200 space-x-2 ${
          isPressed && "border-y-0"
        } ${!isPressed && "mb-2"}`}
      >
        <View className="flex-1">
          <Text className="text-lg ">{name}</Text>
          <Text className="text-xs text-gray-500">{short_description}</Text>
          <Text className="text-gray-500 mt-1">
            <Currency quantity={price} currency="INR" />
          </Text>
        </View>
        <View>
          <Image
            source={{
              uri: image,
            }}
            className="w-20 h-20 rounded-sm"
          />
        </View>
      </TouchableOpacity>
      {isPressed && (
        <View className="px-4 mb-2 bg-white">
          <View className="flex-row items-center space-x-2 py-1">
            <TouchableOpacity
              disabled={!items.length}
              onPress={removeItemsFromBasket}
            >
              <MinusCircleIcon
                color={items.length === 0 ? "gray" : "#00bbcc"}
                size={28}
              />
            </TouchableOpacity>

            <Text>{items.length}</Text>

            <TouchableOpacity onPress={addItemsToBasket}>
              <PlusCircleIcon color={"#00bbcc"} size={28} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default DishRow;
