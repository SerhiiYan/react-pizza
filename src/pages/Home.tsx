import React, { useCallback, useEffect, useRef } from "react";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import { useSelector } from "react-redux";
import Categories from "../components/Categories";
import Sort, { sortList } from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import { fetchPizza, selectPizzaData } from "../redux/slices/pizzaSlice";
import { useAppDispatch } from "../redux/store";

const Home: React.FC = () => {
  const isMounted = useRef(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { categoryId, currentPage, sort, searchValue } =
    useSelector(selectFilter);

  const { items, status } = useSelector(selectPizzaData);

  const renderPizzas = () =>
    items
      .filter((obj: any) => obj.title.toLowerCase().includes(searchValue))
      .map((obj: any, index: number) => <PizzaBlock key={index} {...obj} />);
  const renderSkeleton = () =>
    [...new Array(10)].map((_, index) => <Skeleton key={index} />);

  function onChangePage(num: number) {
    dispatch(setCurrentPage(num));
  }

  function fetchData() {
    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search${searchValue}` : "";
    dispatch(
      fetchPizza({ sortBy, order, category, search, currentPage: String(currentPage) })
      );
  }
  const onCategoryId = useCallback((id: number) => { 
    dispatch(setCategoryId(id))
  }, [])

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.replace("?", ""));

      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      );

      dispatch(setFilters({ ...params, sort}));
    }
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString.replace("-", "")}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  useEffect(() => {
    window.scrollTo(0, 0);

    fetchData();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onChangeCategory={onCategoryId}
        />
        <Sort />
      </div>
      <h2 className="content__title">All Pizzas</h2>
      <div className="content__items">
        {status === "error" ? (
          <div>
            <h2>error :(</h2>
            <p>Nothing found</p>
          </div>
        ) : status === "loading" ? (
          renderSkeleton()
        ) : (
          renderPizzas()
        )}
      </div>
      <Pagination currentPage={currentPage} onPage={onChangePage} />
    </div>
  );
};

export default Home;
