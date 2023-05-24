import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { heroesSlice } from "./heroesSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, heroesSlice.reducer);

const store = configureStore({
  reducer: {
    heroes: persistedReducer,
  },
});

export const { setCurrentPage, clearSelectedHero } = heroesSlice.actions;

export const persistor = persistStore(store);

export default store;
