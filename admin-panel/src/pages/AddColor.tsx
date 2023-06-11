import { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  createColor, resetState,
} from "../features/color/colorSlice";
import { AppDispatch } from "../app/store";


const schema = yup.object().shape({
  title: yup.string().required("color is Required"),
});

const AddColor = () => {


  const dispatch: AppDispatch = useDispatch();
  const newcolor = useSelector((state: any) => state.color);
  const {
    isSuccess,
    isError,
    isLoading,
    createdcolor,
  } = newcolor;
  useEffect(() => {
    if (isSuccess && createdcolor) {
      toast.success("Color Added Successfullly!");
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
        dispatch(createColor(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 8000);
      }
  });



  return (
    <div>
      <h3 className="mb-4 title">Add Color</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
        <CustomInput
            type="color"
            name="color"
            onChan={formik.handleChange("title")}
            onBlur={formik.handleBlur("title")}
            val={formik.values.title}
            label="Enter Color"
            i_id="color"
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
            Add Color
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddColor;
