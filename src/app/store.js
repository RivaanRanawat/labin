import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import experimentReducer from "../features/movie/movieSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    experiment: experimentReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
