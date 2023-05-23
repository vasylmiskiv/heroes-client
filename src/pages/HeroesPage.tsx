import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHeroes, createHero } from "../redux/store";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import HeroCard from "../components/HeroCard";

const HeroesPage = () => {
  const dispatch: Dispatch<any> = useDispatch();

  const { heroes } = useSelector((state: any) => state.heroes);
  // const status = useSelector((state: any) => state.heroes.status) as
  //   | "idle"
  //   | "loading"
  //   | "succeeded"
  //   | "failed";
  // const error = useSelector((state: any) => state.heroes.error) as
  //   | string
  //   | null;

  useEffect(() => {
    dispatch(fetchHeroes());
  }, []);

  return (
    <section className="container mx-auto px-4 py-20">
      <h1 className="mb-5 text-4xl font-bold text-center">Heroes list</h1>
      <div className="mb-10 w-1/5 bg-green-500 h-1 mx-auto"></div>

      <div className="flex flex-wrap gap-10 justify-center lg:justify-start">
        {heroes.map((hero: Hero) => (
          <div
            key={hero._id}
            className="sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 flex justify-center"
          >
            <HeroCard hero={hero} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroesPage;
