import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  status: "loading", // loading | success | error
};

export const fetchPizza = createAsyncThunk(
  "pizza/fetchPizzas",
  async (params) => {
    const { sortBy, order, category, search, currentPage } = params;
    const [itemsResponse] = await Promise.all([
      axios.get(
        `https://62b21d7320cad3685c899da7.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      ),
    ]);
    return itemsResponse.data;
  }
);

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizza.pending]: (state) => {
      state.status = "loading";
      state.items = [];
    },
    [fetchPizza.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [fetchPizza.rejected]: (state) => {
      state.status = "error";
      state.items = [];
    },
  },
});

export const selectPizzaData = (state) => state.pizza;
export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
