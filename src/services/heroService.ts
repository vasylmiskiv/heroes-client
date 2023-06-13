import axios from "axios";

class HeroService {
  async getHeroes(currentPage: string, itemsPerPage: string) {
    try {
      const response = await axios.get<getHeroesData>(
        `${
          import.meta.env.VITE_API_URL
        }/heroes?page=${currentPage}&perPage=${itemsPerPage}`
      );

      return response.data;
    } catch (error) {
      throw new Error("Failed to get heroes");
    }
  }

  async getHeroById(heroId: string) {
    try {
      const response = await axios.get<Hero>(
        `${import.meta.env.VITE_API_URL}/heroes/${heroId}`
      );

      return response.data;
    } catch (error) {
      throw new Error("Failed to get hero");
    }
  }

  async createHero(newHero: FormData, imageData: FormData) {
    try {
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
    } catch (error) {
      throw new Error("Failed to create hero");
    }
  }

  async updateHero(
    id: string,
    updatedHero: FormData,
    updatedImageData: FormData | null
  ) {
    try {
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
    } catch (error) {
      throw new Error("Failed to update hero");
    }
  }

  async updateHeroImages(id: string, image: string[]) {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/heroes/${id}/images`,
        { image }
      );

      return response.data;
    } catch (error) {
      throw new Error("Failed to update hero");
    }
  }

  async deleteHero(heroId: string) {
    try {
      await axios.delete<File>(
        `${import.meta.env.VITE_API_URL}/heroes/${heroId}`
      );
    } catch (error) {
      throw new Error("Failed to remove the hero");
    }
  }
}

export default HeroService;
