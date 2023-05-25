import { useNavigate } from "react-router-dom";
import CreateHeroForm from "../components/CreateHeroForm";

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

      <div className="flex justify-center">
        <CreateHeroForm />
      </div>
    </section>
  );
};

export default CreateHeroPage;
