import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

enum Status{
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

type Pizza = {
  id: number, 
  title: string, 
  imageUrl: string, 
  price: number, 
  sizes: number[], 
  types: number[],
}

interface PizzaSliceState {
  items: Pizza[];
  status: Status
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

export const fetchPizza = createAsyncThunk<Pizza[], Record<string, string>>(
  "pizza/fetchPizzas",
  async (params) => {
    const { sortBy, order, category, search, currentPage } = params;
    const [itemsResponse] = await Promise.all([
      axios.get(
        `https://62b21d7320cad3685c899da7.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      ),
    ]);
    return itemsResponse.data
  }
);

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
extraReducers(builder) {
  builder.addCase(fetchPizza.pending, (state) => {
    state.status = Status.LOADING;
    state.items = [];
  })
  builder.addCase(fetchPizza.fulfilled, (state, action) => {
    state.items = action.payload;
    state.status = Status.SUCCESS;
  })
  builder.addCase(fetchPizza.rejected, (state) => {
    state.status = Status.ERROR
    state.items = [];
  })
},
});

export const selectPizzaData = (state: RootState) => state.pizza;
export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
