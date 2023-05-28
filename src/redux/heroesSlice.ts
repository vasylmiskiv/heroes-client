import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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

export const createHero = createAsyncThunk(
  "heroes/createHero",
  async ({
    newHero,
    imageData,
  }: {
    newHero: FormData;
    imageData: FormData;
  }) => {
    const responseImgBb = await axios.post(
      `${import.meta.env.VITE_IMGBB_API}/1/upload?key=${
        import.meta.env.VITE_IMGBB_API_KEY
      }`,
      imageData
    );

    const imageUrl = responseImgBb.data.data.url;

    newHero.append("image", imageUrl);

    const response = await axios.post<Hero>(
      `${import.meta.env.VITE_API_URL}/heroes`,
      newHero
    );

    return response.data;
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
    if (updatedImageData) {
      const responseImgBb = await axios.post(
        `${import.meta.env.VITE_IMGBB_API}/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        updatedImageData
      );

      const imageUrl = responseImgBb.data.data.url;
      updatedHero.append("image", imageUrl);
    }

    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/heroes/${id}`,
      updatedHero
    );

    return response.data;
  }
);

export const updateHeroImages = createAsyncThunk(
  "heroes/updateHeroImages",
  async (_, { getState }: { getState: any }) => {
    const { selectedHero } = getState().heroes;

    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/heroes/${selectedHero._id}/images`,
      { image: selectedHero.image }
    );

    return response.data;
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
        // state.status = "succeeded";
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
