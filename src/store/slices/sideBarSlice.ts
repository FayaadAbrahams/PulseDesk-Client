import { createSlice } from "@reduxjs/toolkit";

const sideBarSlice = createSlice({
  name: "sidebar",
  initialState: { isOpen: false },
  reducers: {
    setSideBar: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

export const { setSideBar } = sideBarSlice.actions;
export default sideBarSlice.reducer;
