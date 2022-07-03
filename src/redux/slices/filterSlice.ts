import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export enum SortPropertyEnum {
  RATING_DESC = "rating",
  RATING_ASC = "-rating",
  PRICE_DESC = "price",
  PRICE_ASC = "-price",
  POPULARITY_DESC = "popularity",
  POPULARITY_ASC = "-popularity",
}

export type Sort = {
    name: string,
    sortProperty: SortPropertyEnum,
}

interface FilterSliceState {
  searchValue: string,
  categoryId: number,
  currentPage: number,
  sort: Sort,
}

const initialState: FilterSliceState = {
  searchValue: "",
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: "popularity",
    sortProperty: SortPropertyEnum.RATING_DESC,
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSortCategory(state, action: PayloadAction<any>) {
      state.sort = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<any>) {
      if(Object.keys(action.payload).length) {

        state.currentPage = +action.payload.currentPage;
        state.categoryId = +action.payload.categoryId;
        state.sort = action.payload.sort;
      } else {
        state.currentPage = 1
        state.categoryId = 0
        state.sort = {
          name: 'price',
          sortProperty: SortPropertyEnum.PRICE_DESC 
        }
      }
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;
export const selectSort = (state: RootState) => state.filter.sort;
export const {
  setCategoryId,
  setSortCategory,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
