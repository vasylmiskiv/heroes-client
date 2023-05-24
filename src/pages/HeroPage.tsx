import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteHero, getHeroById } from "../redux/store";
import { Dispatch } from "@reduxjs/toolkit";
import { RotatingTriangles } from "react-loader-spinner";

import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const HeroPage: React.FC = () => {
  const { id } = useParams();
  const { selectedHero, status } = useSelector((state: any) => state.heroes);

  const dispatch: Dispatch<any> = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(getHeroById(id));
    }
  }, []);

  const handleScroll = (event: any) => {
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
        <div className="mx-auto bg-white text-slate-900 bg-opacity-20 rounded-lg shadow-lg p-6">
          {selectedHero ? (
            <div className="flex max-lg:flex-col md:space-x-10">
              <img
                src={selectedHero.image[selectedHero.image.length - 1]}
                alt="hero"
                className="rounded-lg md:h-[450px]"
              />
              <div className="flex py-5 flex-col justify-between gap-5">
                <div>
                  <div className="text-3xl font-bold mb-4 break-words">
                    <div className="flex items-center gap-5 ">
                      <div>{selectedHero.nickname}</div>
                      <Link to={`/edit/${id}`}>
                        <div className="bg-gray-500 rounded-full p-2 hover:bg-gray-700 cursor-pointer transition-all duration-200">
                          <AiOutlineEdit size={12} />
                        </div>
                      </Link>
                    </div>
                  </div>
                  <p className="mb-4 text-xl break-words">
                    <span className="font-semibold">Real Name:</span>{" "}
                    {selectedHero.real_name}
                  </p>
                  <p className="mb-4 text-xl break-words">
                    <span className="font-semibold">Origin Description:</span>{" "}
                    {selectedHero.origin_description}
                  </p>
                  <p className="mb-4 text-xl break-words">
                    <span className="font-semibold">Superpowers:</span>{" "}
                    {selectedHero.superpowers}
                  </p>
                  <p className="mb-10 text-xl break-words">
                    <span className="font-semibold">Catch Phrase:</span>{" "}
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
                      className="w-[160px] h-[120px] rounded-lg"
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
