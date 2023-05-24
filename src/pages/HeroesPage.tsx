import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedHero, getHeroes, setCurrentPage } from "../redux/store";
import { Dispatch } from "@reduxjs/toolkit";
import HeroCard from "../components/HeroCard";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import { Link } from "react-router-dom";
import { RotatingTriangles } from "react-loader-spinner";

const HeroesPage = () => {
  const dispatch: Dispatch<any> = useDispatch();

  const { heroes, currentPage, totalPages, status } = useSelector(
    (state: any) => state.heroes
  );

  useEffect(() => {
    dispatch(clearSelectedHero());
  }, []);

  useEffect(() => {
    dispatch(getHeroes());
  }, [currentPage]);

  const onChangeCurrentPage = (newPage: any) => {
    dispatch(setCurrentPage(newPage));
  };

  return (
    <section id="heroes-list">
      <div className="container mx-auto px-7 py-20">
        <h1 className="mb-5 text-4xl font-bold text-white text-center">
          Heroes list
        </h1>
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
          <div className="mb-20 flex flex-wrap justify-center gap-10">
            {heroes.length ? (
              heroes.map((hero: Hero) => (
                <div
                  key={hero._id}
                  className="sm:w-1/2 md:w-1/3 lg:w-1/5 xl:w-1/6 flex"
                >
                  <HeroCard hero={hero} />
                </div>
              ))
            ) : (
              <div className="text-center px-20 py-10 rounded-lg bg-white bg-opacity-50">
                <div className="mb-10 text-4xl font-semibold">
                  Hero list is empty
                </div>
                <Link
                  to="/create"
                  className="text-sm text-green-700 hover:underline"
                >
                  Let's Create
                </Link>
              </div>
            )}
          </div>
        )}
        <ResponsivePagination
          current={currentPage}
          total={totalPages}
          onPageChange={onChangeCurrentPage}
        />
      </div>
    </section>
  );
};

export default HeroesPage;
