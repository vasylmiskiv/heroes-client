import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const initialState: HeroesState = {
  heroes: [],
  selectedHero: null,
  status: "idle",
  error: null,
};

export const fetchHeroes = createAsyncThunk("heroes/fetchHeroes", async () => {
  const response = await axios.get<Hero[]>(
    `${import.meta.env.VITE_API_URL}/heroes`
  );

  return response.data;
});

export const createHero = createAsyncThunk(
  "heroes/createHero",
  async (newHero: Hero) => {
    const response = await axios.post<Hero>(
      `${import.meta.env.VITE_API_URL}/heroes`,
      newHero
    );

    return response.data;
  }
);

export const getHeroById = createAsyncThunk(
  "heroes/getHeroById",
  async (heroId: string) => {
    try {
      const response = await axios.get<Hero>(
        `${import.meta.env.VITE_API_URL}/heroes/${heroId}`
      );

      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch hero data");
    }
  }
);

const heroesSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.heroes = action.payload;
      })
      .addCase(fetchHeroes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      })
      .addCase(createHero.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createHero.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.heroes.push(action.payload);
      })
      .addCase(createHero.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      })
      .addCase(getHeroById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getHeroById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedHero = action.payload;
      })
      .addCase(getHeroById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      });
  },
});

const store = configureStore({
  reducer: {
    heroes: heroesSlice.reducer,
  },
});

export default store;
