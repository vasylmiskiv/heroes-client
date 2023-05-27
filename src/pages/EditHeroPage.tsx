import { useNavigate } from "react-router-dom";
import Form from "../components/Form";

const EditHeroPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <section className="container mx-auto pt-10 pb-20">
      <div className="px-4">
        <button
          className="bg-green-500 py-2 px-6 hover:bg-green-600 text-white rounded-lg max-md:mb-10"
          onClick={handleGoBack}
        >
          Go back
        </button>
      </div>
      <h1 className="mb-5 text-4xl font-bold text-white text-center">
        Edit Hero
      </h1>
      <div className="mb-6 w-1/5 bg-green-500 h-1 mx-auto"></div>
      <Form type="edit" />
    </section>
  );
};

export default EditHeroPage;
