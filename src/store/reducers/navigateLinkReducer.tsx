import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const links = [
  {
    name: "Movies",
    href: "/",
  },
  {
    name: "Rated Movies",
    href: "/rated",
  },
];

const initialState: {
  arr: Array<{ name: string; href: string }>;
  active: string;
} = { arr: links, active: links[0].name };

export const navigateLinkReducer = createSlice({
  name: "navigateLink",
  initialState,
  reducers: {
    setNavigate: (
      state,
      action: PayloadAction<Array<{ name: string; href: string }>>
    ) => {
      state.arr = action.payload;
    },
    setActive: (state, action: PayloadAction<string>) => {
      state.active = action.payload;
    },
  },
});

export const { setNavigate, setActive } = navigateLinkReducer.actions;

export default navigateLinkReducer.reducer;
