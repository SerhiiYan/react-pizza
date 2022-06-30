import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchValue: "",
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: "popularity",
    sortProperty: "rating",
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSortCategory(state, action) {
      state.sort = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.currentPage = +action.payload.currentPage;
      state.categoryId = +action.payload.categoryId;
      state.sort = action.payload.sort;
    },
  },
});

export const selectFilter = (state) => state.filter;
export const selectSort = (state) => state.filter.sort;
export const {
  setCategoryId,
  setSortCategory,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
