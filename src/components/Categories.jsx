import React, { useState } from "react";
import CategoryItem from "./CategoryItem";

function Categories({ categoryId, onChangeCategory }) {
  const categories = [
    "All",
    "Meat",
    "Vegetarian",
    "Grill",
    "Spicy",
    "Ukrainian",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => (
          <CategoryItem
            key={index}
            index={index}
            onChangeCategory={onChangeCategory}
            title={item}
            active={categoryId === index ? "active" : ""}
          />
        ))}
      </ul>
    </div>
  );
}

export default Categories;
