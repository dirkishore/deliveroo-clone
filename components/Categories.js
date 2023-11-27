import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import client from "../sanity";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    client
      .fetch(
        `
    *[_type=='category']
    `
      )
      .then((res) => {
        setCategories(res);
      });
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        paddingVertical: 5,
        gap: 10,
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {categories.map((category) => (
        <CategoryCard
          key={category._id}
          imgUrl={category.image}
          title={category.name}
        />
      ))}
    </ScrollView>
  );
};

export default Categories;
