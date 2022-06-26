import React from "react";

const CategoryItem = ({ title, onChangeCategory, index, active }) => {
  return (
    <>
      <li className={active} onClick={() => onChangeCategory(index)}>
        {title}
      </li>
    </>
  );
};

export default CategoryItem;
