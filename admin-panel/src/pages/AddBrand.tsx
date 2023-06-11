import { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  createBrand,
} from "../features/brand/brandSlice";
import { AppDispatch } from "../app/store";

const schema = yup.object().shape({
  title: yup.string().required("Brand Name is Required"),
});
const Addbrand = () => {
  const dispatch: AppDispatch = useDispatch();
  const newBrand = useSelector((state: any) => state.brand);
  const {
    isSuccess,
    isError,
    isLoading,
    createdBrand,
  } = newBrand;
  useEffect(() => {
    if (isSuccess && createdBrand) {
      toast.success("Brand Added Successfullly!");
    }
    else if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
        dispatch(createBrand(values));
        formik.resetForm();
      }
  });

  return (
    <div>
      <h3 className="mb-4 title">
        Add Brand
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="title"
            onChan={formik.handleChange("title")}
            onBlur={formik.handleBlur("title")}
            val={formik.values.title}
            label="Enter Brand"
            i_id="brand"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title ? (
              <div>{formik.errors.title}</div>
            ) : null}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add Brand
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addbrand;