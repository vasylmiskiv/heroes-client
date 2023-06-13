import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  createHero,
  deleteHero,
  getHeroes,
  updateHero,
  updateHeroImages,
} from "../redux/heroesSlice";

import { AiOutlineDelete } from "react-icons/ai";
import { deleteHeroImage } from "../redux/heroesSlice";

const Form = ({ type }: FormProps) => {
  const { selectedHero } = useSelector((state: RootState) => state.heroes);

  const getInitialValues = () => {
    if (type === "edit" && selectedHero) {
      return {
        nickname: selectedHero.nickname || "",
        realName: selectedHero.real_name || "",
        originDescription: selectedHero.origin_description || "",
        superpowers: selectedHero.superpowers || "",
        catchPhrase: selectedHero.catch_phrase || "",
        image: "",
      };
    }

    return {
      nickname: "",
      realName: "",
      originDescription: "",
      superpowers: "",
      catchPhrase: "",
      image: "",
    };
  };

  let validationSchema = Yup.object({
    nickname: Yup.string()
      .required("Nickname is required")
      .min(2, "Nickname should have at least 2 characters")
      .matches(/^[A-Za-z\s]+$/i, "Nickname should only contain letters"),
    realName: Yup.string()
      .required("Real name is required")
      .min(2, "Real name should have at least 2 characters")
      .matches(/^[A-Za-z\s]+$/i, "Real name should only contain letters"),
    originDescription: Yup.string().required("Origin description is required"),
    superpowers: Yup.string().required("Superpowers is required"),
    catchPhrase: Yup.string().required("Catch Phrase is required"),
  });

  if (type === "create") {
    validationSchema = validationSchema.shape({
      image: Yup.mixed().required("Image is required"),
    });
  }

  const navigate = useNavigate();
  const dispatch: Dispatch<any> = useDispatch();

  const { id } = useParams();

  const navigateToHeroes = async () => {
    await dispatch(getHeroes());
    navigate("/");
  };

  const handleDeleteImage = (index: number) => {
    dispatch(deleteHeroImage({ index }));
    dispatch(updateHeroImages());
  };

  const handleDeleteHero = async () => {
    const shouldDelete = window.confirm(
      `Do you want to delete ${selectedHero?.nickname}?`
    );

    if (id && shouldDelete) {
      dispatch(deleteHero(id));
      await navigateToHeroes();
    }
  };

  const formik = useFormik({
    initialValues: getInitialValues(),
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      const imageData = new FormData();

      formData.append("nickname", values.nickname);
      formData.append("real_name", values.realName);
      formData.append("origin_description", values.originDescription);
      formData.append("superpowers", values.superpowers);
      formData.append("catch_phrase", values.catchPhrase);

      if (values.image) {
        imageData.append("image", values.image);
      }

      if (id) {
        dispatch(
          updateHero({
            id,
            updatedHero: formData,
            updatedImageData: values.image ? imageData : null,
          })
        );
      } else {
        dispatch(createHero({ newHero: formData, imageData }));
      }

      await navigateToHeroes();
    },
  });

  return (
    <div className="rounded px-5 mx-auto">
      <div className="flex max-md:flex-col-reverse mx-auto gap-10">
        {type === "edit" && (
          <div className="relative max-md:w-full w-1/3 bg-slate-900 p-10 overflow-x-auto h-[600px] rounded-lg">
            {/* {status === "loading" && (
              <div className="absolute inset-0 z-50 flex items-center justify-center">
                <Loader height={50} width={50} />
              </div>
            )} */}
            {selectedHero?.image.map((imagePath: string, index: number) => (
              <div className="flex items-center mb-10 gap-10" key={imagePath}>
                <div className="relative">
                  <img
                    src={imagePath}
                    className="w-[450px] opacity-75  hover:opacity-100 transition-all duration-500"
                  />
                  <button
                    className={`absolute bottom-5 right-5 py-2 px-4 rounded-lg ${
                      selectedHero?.image.length === 1
                        ? `bg-gray-500 cursor-not-allowed`
                        : `text-red-800 bg-red-400 hover:bg-red-500 transition-all duration-200 cursor-pointer`
                    } `}
                    disabled={selectedHero?.image.length === 1}
                    onClick={() => handleDeleteImage(index)}
                  >
                    <AiOutlineDelete size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <form
          onSubmit={formik.handleSubmit}
          className="border flex-1 border-gray-700 bg-slate-900 text-white rounded-lg p-5 md:p-10"
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
                  className={`outline-none autocomplete-off border-b-2 px-4 py-2 w-full bg-transparent hover:border-green-300 focus:border-green-300 ${
                    formik.errors.realName ? "border-red-500" : ""
                  }`}
                  type="text"
                  name="realName"
                  autoComplete="off"
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
                autoComplete="off"
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
                autoComplete="off"
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
                autoComplete="off"
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
                  const file = event.currentTarget.files[0];
                  formik.setFieldValue("image", file);
                } else {
                  formik.setFieldValue("image", null);
                }
              }}
            />
            {formik.touched.image && formik.errors.image && (
              <div className="text-red-500 text-sm">
                {String(formik.errors.image)}
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 py-3 bg-green-400 hover:bg-green-500 rounded-lg text-white font-semibold"
            >
              {type === "edit" && `Save changes`}
              {type === "create" && "Create a hero"}
            </button>
            {type === "edit" && (
              <button
                type="submit"
                className="w-1/6 py-3 flex justify-center items-center rounded-lg bg-red-500 hover:bg-red-600 transition-all duration-200"
                onClick={() => handleDeleteHero()}
              >
                <AiOutlineDelete size={18} />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
