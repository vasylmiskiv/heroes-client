import { Link } from "react-router-dom";

const HeroCard = ({ hero }: any) => {
  return (
    <div className="h-[415px] max-w-xs rounded-lg overflow-hidden shadow-lg bg-white">
      <img
        className="w-full"
        src={`https://www.freecodecamp.org/news/content/images/size/w2000/2022/09/jonatan-pie-3l3RwQdHRHg-unsplash.jpg`}
        alt="hero-image"
      />
      <div className="px-6 py-4">
        <div className="text-xl mb-2">
          <span className="font-bold">Nickname:</span>{" "}
          <Link to={`/hero/${hero._id}`}>{hero.nickname}</Link>
        </div>
        <div className="text-sm mb-2">
          <span className="font-semibold">Real name:</span> {hero.real_name}
        </div>
        <div className="text-sm mb-2">
          <span className="font-semibold">Origin description:</span>{" "}
          {hero.origin_description}
        </div>
        <div className="text-sm mb-2">
          <span className="font-semibold">Superpowers:</span> {hero.superpowers}
        </div>
        <div className="text-sm">
          <span className="font-semibold">Catch phrase:</span>{" "}
          {hero.catch_phrase}
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
