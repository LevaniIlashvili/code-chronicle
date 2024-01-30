import { configureStore } from "@reduxjs/toolkit";
import libraryReducer from "@/lib/features/library/librarySlice";
import blogsReducer from "@/lib/features/blogs/blogsSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      library: libraryReducer,
      blogs: blogsReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the type of RootState and AppDispatch from `store` itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
