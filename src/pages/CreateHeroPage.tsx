import { useNavigate } from "react-router-dom";
import createHeroCover from "../assets/createhero-cover.jpg";
import Form from "../components/Form";

const CreateHeroPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <section className="container mx-auto py-10">
      <div className="px-5">
        <button
          className="bg-green-500 py-2 px-8 hover:bg-green-600 text-white rounded-lg max-md:mb-10"
          onClick={handleGoBack}
        >
          Go back
        </button>
      </div>

      <h1 className="mb-5 text-4xl font-bold text-white text-center">
        Create a hero
      </h1>
      <div className="mb-6 w-1/5 bg-green-500 h-1 mx-auto"></div>
      <div className="flex">
        <div className="hidden xl:block xl:w-1/2">
          <img
            src={createHeroCover}
            alt="createhero-cover"
            className="h-full opacity-75 hover:opacity-100 rounded-lg transition-all duration-500"
          />
        </div>
        <div className="w-full justify-center xl:w-1/2">
          <Form type="create" />
        </div>
      </div>
    </section>
  );
};

export default CreateHeroPage;
