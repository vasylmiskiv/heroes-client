import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: HeroesState = {
  heroes: [],
  totalPages: 0,
  currentPage: 0,
  itemsPerPage: 5,
  selectedHero: null,
  status: "idle",
  error: null,
};

export const getHeroes = createAsyncThunk(
  "heroes/getHeroes",
  async (_, { getState }: { getState: any }) => {
    const { currentPage, itemsPerPage } = getState().heroes;

    const response = await axios.get<getHeroesData>(
      `${
        import.meta.env.VITE_API_URL
      }/heroes?page=${currentPage}&perPage=${itemsPerPage}`
    );

    const {
      heroes,
      totalPages,
      currentPage: responseCurrentPage,
    } = response.data;

    return { heroes, totalPages, currentPage: responseCurrentPage };
  }
);

export const createHero = createAsyncThunk(
  "heroes/createHero",
  async (newHero: FormData) => {
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

export const updateHero = createAsyncThunk(
  "heroes/updateHero",
  async ({ id, data }: { id: any; data: any }) => {
    try {
      const response = await axios.put<File>(
        `${import.meta.env.VITE_API_URL}/heroes/${id}`,
        data
      );

      return response.data;
    } catch (error) {
      throw new Error("Failed to update hero data");
    }
  }
);

export const deleteHero = createAsyncThunk(
  "heroes/deleteHero",
  async (id: string) => {
    try {
      const response = await axios.delete<File>(
        `${import.meta.env.VITE_API_URL}/heroes/${id}`
      );

      return response.data;
    } catch (error) {
      throw new Error("Failed to update hero data");
    }
  }
);

export const heroesSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    clearSelectedHero: (state) => {
      state.selectedHero = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHeroes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getHeroes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.heroes = action.payload.heroes;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(getHeroes.rejected, (state, action) => {
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
      })
      .addCase(updateHero.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateHero.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedHero = action.payload;
      })
      .addCase(updateHero.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      })
      .addCase(deleteHero.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteHero.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedHero = action.payload;
      })
      .addCase(deleteHero.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      });
  },
});

export const { setCurrentPage, clearSelectedHero } = heroesSlice.actions;
