import thunk from "redux-thunk";
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
  middleware: [thunk],
});

export const { setCurrentPage, clearSelectedHero, deleteHeroImage } =
  heroesSlice.actions;

export const persistor = persistStore(store);

export default store;
