import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "./store";

import HomeScreen from "./screens/HomeScreen";
import RestaurantScreen from "./screens/RestaurantScreen";

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
          </stack.Navigator>
        </Provider>
      </NavigationContainer>
    </>
  );
}
