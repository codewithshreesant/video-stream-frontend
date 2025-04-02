import { createSlice } from "@reduxjs/toolkit";

const getUser = () => {
  const userString = localStorage.getItem('user');
  if (!userString) {
    return { user: null };
  }
  try {
    const user = JSON.parse(userString);
    return { user };
  } catch (error) {
    console.error("Error parsing user data from localStorage:", error);
    localStorage.removeItem('user'); // Clear potentially invalid data
    return { user: null };
  }
};

const initialState = getUser();

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser: (state, action) => {
      localStorage.setItem('user', JSON.stringify(action.payload));
      state.user = action.payload; // Update state when user is saved
    },
    removeUser: (state) => {
      localStorage.removeItem('user');
      state.user = null; // Update state when user is removed
    },
  },
});

export const { saveUser, removeUser } = userSlice.actions;

export default userSlice.reducer;