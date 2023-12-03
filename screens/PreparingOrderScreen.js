import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";

const PreparingOrderScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Delivery");
    }, 4000);
  });

  return (
    <SafeAreaView className="flex-1 bg-[#00ccbb] justify-center items-center">
      <Animatable.Image
        source={require("../assets/placingOrder.gif")}
        animation="slideInUp"
        iterationCount={1}
        className="h-80 w-80"
      />
      <Animatable.Text
        iterationCount={1}
        animation="slideInUp"
        className=" text-white font-bold"
      >
        Waiting for Restaurant to accept your order!
      </Animatable.Text>
    </SafeAreaView>
  );
};

export default PreparingOrderScreen;
