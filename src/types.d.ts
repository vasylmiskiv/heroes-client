type RootState = {
  heroes: HeroesState;
};

interface Hero {
  _id?: string;
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers: string;
  catch_phrase: string;
  image: string[];
  createdAt?: string;
  updatedAt?: string;
}

interface getHeroesData {
  heroes: Hero[];
  totalPages: number;
  currentPage: number;
}

interface GetHeroesParams {
  page?: number;
  perPage?: number;
}

interface HeroesState {
  pageHeroes: Hero[];
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
  selectedHero: Hero | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

interface HeroCardProps {
  hero: Hero;
}
