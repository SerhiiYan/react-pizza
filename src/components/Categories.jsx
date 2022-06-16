import React, { useState } from "react";
import CategoryItem from "./CategoryItem";

function Categories() {
  const [activeIndex, setActiveIndex] = useState(0);
  const categories = [
    "All",
    "Meat",
    "Vegetarian",
    "Grill",
    "Spicy",
    "Ukrainian",
  ];

  const onClickCategory = (index) => {
    console.log(index);
    setActiveIndex(index);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => (
          <CategoryItem
            key={index}
            index={index}
            onClickCategory={onClickCategory}
            title={item}
            active={activeIndex === index ? "active" : ""}
          />
        ))}
      </ul>
    </div>
  );
}

export default Categories;
