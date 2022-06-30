import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItemById } from "../redux/slices/cartSlice";
import { selectPizzaData } from "../redux/slices/pizzaSlice";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const Pizza = () => {
  const [pizza, setPizza] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://62b21d7320cad3685c899da7.mockapi.io/pizzas/" + id
        );
        console.log(data);
        setPizza(data);
      } catch (error) {
        console.log("error from single pizza fetch");
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return "Download pizza...";
  }

  return (
    <div className="container">
      <div className="pizza-block">
        <img className="pizza-block__image" src={pizza.imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{pizza.title}</h4>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">from {pizza.price} $</div>
        </div>
      </div>
    </div>
  );
};

export default Pizza;
