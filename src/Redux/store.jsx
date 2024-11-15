import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        stateNumber: (state = 0, action) => state
    },
  });
  
