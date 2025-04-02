import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../slice/userSlice'; // Assuming your user slice is in userSlice.js
import videoApi from '../features/videoApi';
import commentApi from '../features/commentApi';
import userApi from "../features/userApi";
import reactionApi from '../features/reactionApi'

export const store = configureStore({
  reducer: {
    auth: userReducer, // Use a more descriptive name for the user reducer
    [videoApi.reducerPath]: videoApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [reactionApi.reducerPath]: reactionApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(videoApi.middleware, commentApi.middleware, userApi.middleware, reactionApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;