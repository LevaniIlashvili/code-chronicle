import { createSlice } from "@reduxjs/toolkit";
import { Blog } from "@/types";

const initialState: Blog[] = [];

const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    setLibrary: (state, action) => {
      state.splice(0, state.length, ...action.payload);
    },
  },
});

export const { setLibrary } = librarySlice.actions;
export default librarySlice.reducer;
