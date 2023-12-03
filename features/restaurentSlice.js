import { createSlice } from "@reduxjs/toolkit";

export const restaurantSlice = createSlice({
  name: "restaurant",
  initialState: {
    restaurant: {
      id: null,
      imageUrl: null,
      title: null,
      rating: null,
      genre: null,
      address: null,
      short_description: null,
      dishes: null,
    },
  },
  reducers: {
    setRestaurant: (state, action) => {
      state.restaurant = action.payload;
    },
  },
});

export const selectRestaurant = (state) => state.restaurant.restaurant;

export const { setRestaurant } = restaurantSlice.actions;

export default restaurantSlice.reducer;
