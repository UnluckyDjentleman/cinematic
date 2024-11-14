import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../../constants/types/user";

const initialState: { user: User | undefined } = { user: undefined };

export const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | undefined>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userReducer.actions;

export default userReducer.reducer;
