import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Dispatch } from "@reduxjs/toolkit";
import { deleteHero, updateHero } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";

const EditHeroPage = () => {
  const { selectedHero, status } = useSelector((state: any) => state.heroes);

  const { id } = useParams();
  const dispatch: Dispatch<any> = useDispatch();
  const navigate = useNavigate();

  const [heroData, setHeroData] = useState({
    nickname: "",
    realName: "",
    originDescription: "",
    superpowers: "",
    catchPhrase: "",
    image: "",
  });

  useEffect(() => {
    if (selectedHero) {
      setHeroData({
        nickname: selectedHero.nickname,
        realName: selectedHero.real_name,
        originDescription: selectedHero.origin_description,
        superpowers: selectedHero.superpowers,
        catchPhrase: selectedHero.catch_phrase,
        image: selectedHero.image,
      });
    }
  }, [selectedHero]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleInputChange = (e: any) => {
    setHeroData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    setHeroData({
      ...heroData,
      image: file,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("nickname", heroData.nickname);
    formData.append("real_name", heroData.realName);
    formData.append("origin_description", heroData.originDescription);
    formData.append("superpowers", heroData.superpowers);
    formData.append("catch_phrase", heroData.catchPhrase);
    formData.append("image", heroData.image);

    dispatch(updateHero({ id, data: formData }));

    if (status === "succeeded") {
      navigate("/");
    }
  };

  const handleDeleteHero = () => {
    const shouldDelete = window.confirm(
      `Do you want to delete ${heroData.nickname}?`
    );

    if (id && shouldDelete) {
      dispatch(deleteHero(id));

      if (status === "succeeded") {
        navigate("/");
        console.log(123);
      }
    }
  };

  return (
    <section className="container mx-auto py-10">
      <button
        className="bg-green-500 py-2 px-6 hover:bg-green-600 text-white rounded-lg"
        onClick={handleGoBack}
      >
        Go back
      </button>
      <div className="md:w-1/2 xl:w-1/3 px-7 mx-auto">
        <h1 className="mb-10 text-4xl font-bold">Edit Hero</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Nickname:
              <input
                type="text"
                name="nickname"
                value={heroData.nickname}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-4 py-2 w-full"
              />
            </label>
          </div>
          <div>
            <label>
              Real Name:
              <input
                type="text"
                name="realName"
                value={heroData.realName}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-4 py-2 w-full"
              />
            </label>
          </div>
          <div>
            <label>
              Origin Description:
              <textarea
                name="originDescription"
                value={heroData.originDescription}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-4 py-2 w-full"
              ></textarea>
            </label>
          </div>
          <div>
            <label>
              Superpowers:
              <input
                name="superpowers"
                value={heroData.superpowers}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-4 py-2 w-full"
              />
            </label>
          </div>
          <div>
            <label>
              Catch Phrase:
              <input
                type="text"
                name="catchPhrase"
                value={heroData.catchPhrase}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-4 py-2 w-full"
              />
            </label>
          </div>
          <div className="mb-10">
            <label className="block mb-2">
              Image:
              <hr />
              <input type="file" name="image" onChange={handleImageChange} />
            </label>
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="w-5/6 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded"
            >
              Save Changes
            </button>
            <button
              className="flex-1 py-3 flex justify-center items-center rounded-lg bg-red-500 hover:bg-red-600 transition-all duration-200"
              onClick={() => handleDeleteHero()}
            >
              <AiOutlineDelete size={18} />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditHeroPage;
