import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";

import { createHero } from "../redux/heroesSlice";

const validationSchema = Yup.object({
  nickname: Yup.string()
    .required("Nickname is required")
    .min(2, "Nickname should have at least 2 characters")
    .matches(/^[A-Za-z]+$/, "Nickname should only contain letters"),
  realName: Yup.string()
    .required("Real name is required")
    .min(2, "Real name should have at least 2 characters")
    .matches(/^[A-Za-z]+$/, "Real name should only contain letters"),
  originDescription: Yup.string().required("Origin description is required"),
  superpowers: Yup.string().required("Superpowers is required"),
  catchPhrase: Yup.string().required("Catch Phrase is required"),
  image: Yup.mixed().required("Image is required"),
});

const CreateHeroForm = () => {
  const { status } = useSelector((state: RootState) => state.heroes);

  const navigate = useNavigate();
  const dispatch: Dispatch<any> = useDispatch();

  const formik = useFormik({
    initialValues: {
      nickname: "",
      realName: "",
      originDescription: "",
      superpowers: "",
      catchPhrase: "",
      image: "",
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

      dispatch(createHero(formData));

      if (status === "succeeded") {
        navigate("/");
      }
    },
  });

  return (
    <div className="xl:w-1/2 rounded px-5">
      <h1 className="mb-5 text-4xl font-bold text-white text-center">
        Create a hero
      </h1>
      <div className="mb-6 w-1/5 bg-green-500 h-1 mx-auto"></div>
      <form
        onSubmit={formik.handleSubmit}
        className="border border-gray-700 bg-slate-900 text-white rounded-lg p-5 md:p-10"
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
                {formik.errors.nickname}
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
                {formik.errors.realName}
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
                {formik.errors.originDescription}
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
              {formik.errors.superpowers}
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
              {formik.errors.catchPhrase}
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
            <div className="text-red-500 text-sm">{formik.errors.image}</div>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-green-400 hover:bg-green-500 rounded-lg text-white font-semibold"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateHeroForm;
