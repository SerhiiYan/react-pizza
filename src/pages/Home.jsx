import React, { useState, useEffect } from "react";
import axios from "axios";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import { setCategoryId } from "../redux/slices/filterSlice";
import { useDispatch, useSelector } from "react-redux";

const Home = ({ searchValue }) => {
  const {
    categoryId,
    sort: { sortProperty: sortType },
  } = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const renderPizzas = () =>
    items
      .filter((obj) => obj.title.toLowerCase().includes(searchValue))
      .map((obj, index) => <PizzaBlock key={index} {...obj} />);
  const renderSkeleton = () =>
    [...new Array(10)].map((_, index) => <Skeleton key={index} />);

  useEffect(() => {
    const sortBy = sortType.replace("-", "");
    const order = sortType.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search${searchValue}` : "";
    async function fetchData() {
      try {
        setLoading(true);
        const [itemsResponse] = await Promise.all([
          axios.get(
            `https://62b21d7320cad3685c899da7.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
          ),
        ]);
        setItems(itemsResponse.data);
      } catch (e) {
        console.error("fetching items error");
      }
      setLoading(false);
    }
    fetchData();
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onChangeCategory={(id) => dispatch(setCategoryId(id))}
        />
        <Sort />
      </div>
      <h2 className="content__title">All Pizzas</h2>
      <div className="content__items">
        {loading ? renderSkeleton() : renderPizzas()}
      </div>
      <Pagination onPage={(num) => setCurrentPage(num)} />
    </div>
  );
};

export default Home;
