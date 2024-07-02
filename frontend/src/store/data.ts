import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DataItem } from "@/types/DataItem";

interface DataState {
  dataItems: DataItem[];
  currentPage: number;
  itemsPerPage: number;
  searchTerm: string;
}

const initialState: DataState = {
  dataItems: [],
  currentPage: 1,
  itemsPerPage: 10, // Default items per page
  searchTerm: "",
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setDataItems: (state, action: PayloadAction<DataItem[]>) => {
      state.dataItems = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

export const {
  setDataItems,
  setCurrentPage,
  setItemsPerPage,
  setSearchTerm,
} = dataSlice.actions;

export default dataSlice.reducer;