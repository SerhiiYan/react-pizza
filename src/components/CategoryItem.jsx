import React from "react";

const CategoryItem = ({ title, onClickCategory, index, active }) => {
  return (
    <>
      <li className={active} onClick={() => onClickCategory(index)}>
        {title}
      </li>
    </>
  );
};

export default CategoryItem;
