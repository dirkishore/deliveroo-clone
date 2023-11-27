import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import RestaurantScreen from "./screens/RestaurantScreen";

export default function App() {
  const stack = createStackNavigator();
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <stack.Navigator>
          <stack.Screen name="Home" component={HomeScreen} />
          <stack.Screen name="Restaurant" component={RestaurantScreen} />
        </stack.Navigator>
      </NavigationContainer>
    </>
  );
}
