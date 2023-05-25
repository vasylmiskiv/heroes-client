import { useDispatch, useSelector } from "react-redux";
import { deleteHero, updateHero } from "../redux/heroesSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { useNavigate, useParams } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";

import { AiOutlineDelete } from "react-icons/ai";

const validationSchema = Yup.object({
  nickname: Yup.string()
    .required("Nickname is required")
    .min(2, "Nickname should have at least 2 characters")
    .matches(/^[A-Za-z\s]+$/, "Nickname should only contain letters"),
  realName: Yup.string()
    .required("Real name is required")
    .min(2, "Real name should have at least 2 characters")
    .matches(/^[A-Za-z\s]+$/, "Real name should only contain letters"),
  originDescription: Yup.string().required("Origin description is required"),
  superpowers: Yup.string().required("Superpowers is required"),
  catchPhrase: Yup.string().required("Catch Phrase is required"),
  image: Yup.mixed().required("Image is required"),
});

const EditHeroForm = () => {
  const { selectedHero, status } = useSelector((state: any) => state.heroes);

  const navigate = useNavigate();
  const dispatch: Dispatch<any> = useDispatch();

  const { id } = useParams();

  const handleDeleteHero = () => {
    const shouldDelete = window.confirm(
      `Do you want to delete ${selectedHero.nickname}?`
    );

    if (id && shouldDelete) {
      dispatch(deleteHero(id));

      if (status === "succeeded") {
        navigate("/");
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      nickname: selectedHero.nickname || "",
      realName: selectedHero.real_name || "",
      originDescription: selectedHero.origin_description || "",
      superpowers: selectedHero.superpowers || "",
      catchPhrase: selectedHero.catch_phrase || "",
      image: selectedHero.image || "",
    },
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();

      formData.append("nickname", values.nickname);
      formData.append("real_name", values.realName);
      formData.append("origin_description", values.originDescription);
      formData.append("superpowers", values.superpowers);
      formData.append("catch_phrase", values.catchPhrase);
      formData.append("image", values.image);

      dispatch(updateHero({ id, data: formData }));

      if (status === "succeeded") {
        navigate("/");
      }
    },
  });

  return (
    <div className="rounded px-5 mx-auto">
      <h1 className="mb-5 text-4xl font-bold text-white text-center">
        Edit Hero
      </h1>
      <div className="mb-6 w-1/5 bg-green-500 h-1 mx-auto"></div>
      <div className="flex mx-auto gap-20">
        <div className="w-1/4 bg-slate-900 p-10 overflow-x-auto h-[600px] rounded-lg">
          {selectedHero.image.map((imagePath: string) => (
            <div className="flex items-center mb-10 gap-10">
              <img src={imagePath} className="w-[160px]" />
              <div className="text-red-800 bg-red-400 py-2 px-4 rounded-lg cursor-pointer hover:bg-red-500">
                <AiOutlineDelete size={18} />
              </div>
            </div>
          ))}
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="border xl:w-1/2 border-gray-700 bg-slate-900 text-white rounded-lg p-5 md:p-10"
        >
          <div className="md:flex md:gap-5 max-sm:flex-col">
            <div className="w-1/2 mb-4 max-sm:w-full">
              <label className="block mb-2">
                Hero nickname:
                <input
                  className={`outline-none border-b-2 px-4 py-2 w-full bg-transparent hover:border-green-300 focus:border-green-300 ${
                    formik.errors.nickname ? "border-red-500" : ""
                  }`}
                  type="text"
                  name="nickname"
                  value={formik.values.nickname}
                  onChange={formik.handleChange}
                />
              </label>
              {formik.touched.nickname && formik.errors.nickname && (
                <div className="text-red-500 text-sm">
                  {String(formik.errors.nickname)}
                </div>
              )}
            </div>
            <div className="w-1/2 mb-4 max-sm:w-full">
              <label className="block mb-2">
                Real Name:
                <input
                  className={`outline-none border-b-2 px-4 py-2 w-full bg-transparent hover:border-green-300 focus:border-green-300 ${
                    formik.errors.realName ? "border-red-500" : ""
                  }`}
                  type="text"
                  name="realName"
                  value={formik.values.realName}
                  onChange={formik.handleChange}
                />
              </label>
              {formik.touched.realName && formik.errors.realName && (
                <div className="text-red-500 text-sm">
                  {String(formik.errors.realName)}
                </div>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-2">
              Origin Description:
              <input
                className={`outline-none border-b-2 px-4 py-2 w-full bg-transparent hover:border-green-300 focus:border-green-300 ${
                  formik.errors.originDescription ? "border-red-500" : ""
                }`}
                name="originDescription"
                value={formik.values.originDescription}
                onChange={formik.handleChange}
              />
            </label>
            {formik.touched.originDescription &&
              formik.errors.originDescription && (
                <div className="text-red-500 text-sm">
                  {String(formik.errors.originDescription)}
                </div>
              )}
          </div>
          <div className="mb-4">
            <label className="block mb-2">
              Superpowers:
              <input
                className={`outline-none border-b-2 px-4 py-2 w-full bg-transparent hover:border-green-300 focus:border-green-300 ${
                  formik.errors.superpowers ? "border-red-500" : ""
                }`}
                name="superpowers"
                value={formik.values.superpowers}
                onChange={formik.handleChange}
              />
            </label>
            {formik.touched.superpowers && formik.errors.superpowers && (
              <div className="text-red-500 text-sm">
                <div>{String(formik.errors.superpowers)}</div>
              </div>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2">
              Catch Phrase:
              <input
                className={`outline-none border-b-2 px-4 py-2 w-full bg-transparent hover:border-green-300 focus:border-green-300 ${
                  formik.errors.catchPhrase ? "border-red-500" : ""
                }`}
                name="catchPhrase"
                value={formik.values.catchPhrase}
                onChange={formik.handleChange}
              />
            </label>
            {formik.touched.catchPhrase && formik.errors.catchPhrase && (
              <div className="text-red-500 text-sm">
                {String(formik.errors.catchPhrase)}
              </div>
            )}
          </div>
          <div className="mb-10">
            <label htmlFor="input" className="block mb-2">
              Choose image
            </label>
            <input
              type="file"
              id="input"
              className={`w-full text-white border-2 border-gray-300 px-4 py-2 rounded-md ${
                formik.errors.image ? "border-red-500" : ""
              }`}
              onChange={(event) => {
                if (
                  event.currentTarget.files &&
                  event.currentTarget.files.length > 0
                ) {
                  formik.setFieldValue("image", event.currentTarget.files[0]);
                } else {
                  formik.setFieldValue("image", null);
                }
              }}
            />
            {formik.touched.image && formik.errors.image && (
              <div className="text-red-500 text-sm">123</div>
            )}
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="w-5/6 py-3 bg-green-400 hover:bg-green-500 rounded-lg text-white font-semibold"
            >
              Create
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
    </div>
  );
};

export default EditHeroForm;
