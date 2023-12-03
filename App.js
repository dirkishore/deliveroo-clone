import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "./store";

import HomeScreen from "./screens/HomeScreen";
import RestaurantScreen from "./screens/RestaurantScreen";
import BasketScreen from "./screens/BasketScreen";
import PreparingOrderScreen from "./screens/PreparingOrderScreen";
import DeliveryScreen from "./screens/DeliveryScreen";

export default function App() {
  const stack = createStackNavigator();
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Provider store={store}>
          <stack.Navigator>
            <stack.Screen name="Home" component={HomeScreen} />
            <stack.Screen name="Restaurant" component={RestaurantScreen} />
            <stack.Screen
              name="Basket"
              component={BasketScreen}
              options={{
                headerShown: false,
                presentation: "modal",
              }}
            />
            <stack.Screen
              name="PreparingOrderScreen"
              component={PreparingOrderScreen}
              options={{
                headerShown: false,
                presentation: "card",
              }}
            />

            <stack.Screen
              name="Delivery"
              component={DeliveryScreen}
              options={{
                headerShown: false,
              }}
            />
          </stack.Navigator>
        </Provider>
      </NavigationContainer>
    </>
  );
}
