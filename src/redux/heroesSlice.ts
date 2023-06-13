import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import HeroService from "../services/heroService";

const heroService = new HeroService();

const initialState: HeroesState = {
  pageHeroes: [],
  totalPages: 0,
  currentPage: 1,
  itemsPerPage: 5,
  selectedHero: null,
  status: "idle",
  error: null,
};

export const getHeroes = createAsyncThunk(
  "heroes/getHeroes",
  async (_, { getState }: { getState: any }) => {
    const { currentPage, itemsPerPage } = getState().heroes;

    const {
      heroes,
      totalPages,
      currentPage: responseCurrentPage,
    } = await heroService.getHeroes(currentPage, itemsPerPage);

    return { heroes, totalPages, currentPage: responseCurrentPage };
  }
);

export const getHeroById = createAsyncThunk(
  "heroes/getHeroById",
  async (heroId: string) => {
    const hero = await heroService.getHeroById(heroId);

    return hero;
  }
);

export const createHero = createAsyncThunk(
  "heroes/createHero",
  async ({
    newHero,
    imageData,
  }: {
    newHero: FormData;
    imageData: FormData;
  }) => {
    const createdHero = await heroService.createHero(newHero, imageData);

    return createdHero;
  }
);

export const updateHero = createAsyncThunk(
  "heroes/updateHero",
  async ({
    id,
    updatedHero,
    updatedImageData,
  }: {
    id: string;
    updatedHero: FormData;
    updatedImageData: FormData | null;
  }) => {
    const hero = await heroService.updateHero(
      id,
      updatedHero,
      updatedImageData
    );

    return hero;
  }
);

export const updateHeroImages = createAsyncThunk(
  "heroes/updateHeroImages",
  async (_, { getState }: { getState: any }) => {
    const { selectedHero } = getState().heroes;

    const { _id: id, image } = selectedHero;

    const updatedImages = await heroService.updateHeroImages(id, image);

    return updatedImages;
  }
);

export const deleteHero = createAsyncThunk(
  "heroes/deleteHero",
  async (heroId: string) => {
    await heroService.deleteHero(heroId);
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
    deleteHeroImage: (state, action) => {
      const { index } = action.payload;
      const { selectedHero } = state;

      if (selectedHero && selectedHero.image) {
        state.selectedHero?.image.splice(index, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHeroes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getHeroes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.pageHeroes = action.payload.heroes;
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
        state.pageHeroes.push(action.payload);
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
      .addCase(deleteHero.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(deleteHero.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      })
      .addCase(updateHeroImages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateHeroImages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedHero = action.payload;
      })
      .addCase(updateHeroImages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      });
  },
});

export const { setCurrentPage, clearSelectedHero, deleteHeroImage } =
  heroesSlice.actions;
