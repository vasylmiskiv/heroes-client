interface Hero {
  _id: string;
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers: string;
  catch_phrase: string;
  image: string;
}

interface HeroesState {
  heroes: Hero[];
  selectedHero: Hero | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
