import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getHeroById } from "../redux/store";
import { Dispatch } from "@reduxjs/toolkit";
import HeroCard from "../components/HeroCard";

const HeroPage: React.FC = () => {
  const { id } = useParams(); // Получаем ID из URL
  const { selectedHero } = useSelector((state: any) => state.heroes);

  const dispatch: Dispatch<any> = useDispatch();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      dispatch(getHeroById(params.id));
    }
  }, []);

  return (
    <section className="container mx-auto">
      <div className="w-1/3 mx-auto bg-white rounded-lg shadow-lg p-6">
        {selectedHero ? (
          <div>
            <h1 className="text-2xl font-bold mb-4">{selectedHero.nickname}</h1>
            <p className="mb-2">
              <span className="font-semibold">Real Name:</span>{" "}
              {selectedHero.real_name}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Origin Description:</span>{" "}
              {selectedHero.origin_description}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Superpowers:</span>{" "}
              {selectedHero.superpowers}
            </p>
            <p>
              <span className="font-semibold">Catch Phrase:</span>{" "}
              {selectedHero.catch_phrase}
            </p>
          </div>
        ) : (
          <div className="text-center">No hero found.</div>
        )}
      </div>
    </section>
  );
};

export default HeroPage;
