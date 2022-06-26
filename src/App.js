import "./scss/app.scss";
import React, { useEffect, useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

export const SearchContext = createContext({});

function App() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <SearchContext.Provider
      value={{
        searchValue,
        setSearchValue,
      }}
    >
      <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home searchValue={searchValue} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </SearchContext.Provider>
  );
}

export default App;
