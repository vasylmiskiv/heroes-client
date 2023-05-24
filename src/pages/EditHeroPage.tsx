import { useNavigate } from "react-router-dom";
import EditHeroForm from "../components/EditHeroForm";

const EditHeroPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <section className="container mx-auto py-10">
      <div className="px-4">
        <button
          className="bg-green-500 py-2 px-6 hover:bg-green-600 text-white rounded-lg"
          onClick={handleGoBack}
        >
          Go back
        </button>
      </div>
      <EditHeroForm />
    </section>
  );
};

export default EditHeroPage;
