import "./scss/app.scss";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";
import axios from "axios";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [itemsResponse] = await Promise.all([
          axios.get("https://apimocha.com/mastamil/pizzas"),
        ]);
        setItems(itemsResponse.data);
      } catch (e) {
        console.error("fetching items error");
      }
    }
    fetchData();
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {items.map((obj) => (
              <PizzaBlock key={obj.id} {...obj} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
