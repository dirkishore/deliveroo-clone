import { View, Text, ScrollView } from "react-native";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import React, { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import sanityClient from "../sanity";

const FeaturedRow = ({ id, title, description }) => {
  const [restaurant, setRestaurant] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type=='featured' && _id== $id]{
      ...,
      restaurant[]->{
        ...,
        dishes[]->,
        type->{
          name
        }
      }
    }[0]`,
        { id }
      )
      .then((res) => {
        setRestaurant(res?.restaurant);
      });
  }, [id]);

  return (
    <View>
      <View className="flex-row items-center justify-between">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon color={"#00ccbb"} size={20} />
      </View>
      <Text className="text-xs text-gray-500">{description}</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 10,
          paddingVertical: 10,
        }}
      >
        {restaurant?.map((r) => (
          <RestaurantCard
            key={r._id}
            id={r._id}
            imgUrl={r.image}
            title={r.name}
            rating={r.rating}
            genre={r.type?.name}
            address={r.address}
            short_description={r.short_description}
            dishes={r.dishes}
            long={r.long}
            lat={r.lat}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
