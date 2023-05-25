import { Link } from "react-router-dom";

const HeroCard = ({ hero }: HeroCardProps) => {
  return (
    <Link to={`/hero/${hero._id}`}>
      <div className="relative h-[450px] outline-none hover:transform hover:scale-105 transition-all duration-200">
        <img
          className="h-full object-cover"
          src={hero.image[hero.image.length - 1]}
          alt="hero-image"
        />
        <div className="absolute text-ellipsis overflow-hidden bottom-5 py-2 px-4 bg-gray-500 text-white bg-opacity-40 w-full text-xl mb-2 font-bold text-center">
          {hero.nickname}
        </div>
      </div>
    </Link>
  );
};

export default HeroCard;
