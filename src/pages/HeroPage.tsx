import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Dispatch } from "@reduxjs/toolkit";
import { RotatingTriangles } from "react-loader-spinner";

import { getHeroById } from "../redux/heroesSlice";
import { AiOutlineEdit } from "react-icons/ai";

const HeroPage: React.FC = () => {
  const { selectedHero, status } = useSelector(
    (state: RootState) => state.heroes
  );

  const { id } = useParams();
  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getHeroById(id));
    }
  }, []);

  const handleScroll: React.WheelEventHandler<HTMLDivElement> = (event) => {
    const delta = Math.sign(event.deltaY);
    const container = event.currentTarget;
    container.scrollLeft += delta * 50;
  };

  return (
    <section className="container mx-auto px-5 py-16">
      <h1 className="mb-5 text-4xl font-bold text-white text-center">Hero</h1>
      <div className="mb-10 w-1/5 bg-green-500 h-1 mx-auto"></div>
      {status === "loading" ? (
        <div className="py-40 flex justify-center">
          <RotatingTriangles
            visible={true}
            height="100"
            width="100"
            ariaLabel="rotating-triangels-loading"
            wrapperStyle={{}}
            wrapperClass="rotating-triangels-wrapper"
          />
        </div>
      ) : (
        <div className="mx-auto bg-slate-900 text-white rounded-lg shadow-lg p-6">
          {selectedHero ? (
            <div className="flex max-xl:flex-col md:space-x-10">
              <img
                src={selectedHero.image[selectedHero.image.length - 1]}
                alt="hero"
                className="rounded-lg md:h-[450px]"
              />
              <div className="flex-1 flex py-5 flex-col justify-between gap-5">
                <div className="text-3xl font-bold">
                  <div className="mb-5 flex gap-5">
                    <p className="text-2xl md:text-4xl">
                      {selectedHero.nickname}
                    </p>
                    <Link to={`/edit/${id}`}>
                      <div className="bg-gray-500 rounded-full p-2 mt-3 hover:bg-gray-600 cursor-pointer transition-all duration-200">
                        <AiOutlineEdit size={12} />
                      </div>
                    </Link>
                  </div>
                  <div className="h-[2px] bg-gradient-to-r from-orange-500 to-blue-500"></div>
                </div>
                <div className="overflow-y-auto h-[200px]">
                  <p className="mb-4 text-xl break-words text-gray-400">
                    <span className="font-semibold text-white">
                      Real Name:{" "}
                    </span>
                    {selectedHero.real_name}
                  </p>
                  <p className="mb-4 text-xl break-words text-gray-400">
                    <span className="font-semibold text-white">
                      Origin Description:{" "}
                    </span>
                    {selectedHero.origin_description}
                  </p>
                  <p className="mb-4 text-xl break-words text-gray-400">
                    <span className="font-semibold text-white">
                      Superpowers:{" "}
                    </span>
                    {selectedHero.superpowers}
                  </p>
                  <p className="mb-10 text-xl break-words text-gray-400">
                    <span className="font-semibold text-white">
                      Catch Phrase:{" "}
                    </span>
                    {selectedHero.catch_phrase}
                  </p>
                </div>
                <div
                  className="flex py-2 gap-5 overflow-x-auto"
                  onWheel={handleScroll}
                >
                  {selectedHero.image.map((imagePath: string) => (
                    <img
                      src={imagePath}
                      alt="hero-image"
                      className="w-[160px] h-[120px] rounded-lg opacity-75 hover:opacity-100 transition-all duration-500"
                      key={imagePath}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">No hero found.</div>
          )}
        </div>
      )}
    </section>
  );
};

export default HeroPage;
