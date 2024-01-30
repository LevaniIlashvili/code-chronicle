import { Blog } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: Blog[] = [];

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogs: (state, action) => {
      return action.payload;
    },
    addBlog: (state, action) => {
      state.unshift(action.payload);
    },
    removeBlog: (state, action) => {
      return state.filter((blog) => blog._id !== action.payload);
    },
    updateBlog: (state, action) => {
      const index = state.findIndex((blog) => blog._id === action.payload._id);
      state[index] = action.payload;
    },
  },
});

export const { setBlogs, addBlog, removeBlog, updateBlog } = blogsSlice.actions;
export default blogsSlice.reducer;
