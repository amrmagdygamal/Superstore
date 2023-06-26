import { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import {
  createColor,
  getColor,
  resetState,
  updateColor,
} from '../features/color/colorSlice';
import { AppDispatch } from '../app/store';

const schema = yup.object().shape({
  title: yup.string().required('color is Required'),
});

const AddColor = () => {
  const dispatch: AppDispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();
  const getColorId = location.pathname.split('/')[3];

  const {
    colorName,
  } = useSelector((state: any) => state.color);

  useEffect(() => {
    if (getColorId !== undefined) {
      dispatch(getColor(getColorId));
    } else {
      dispatch(resetState());
    }
  }, [getColorId]);


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: colorName || '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getColorId !== undefined) {
        const data: any = { _id: getColorId, title: values.title };
        dispatch(updateColor(data));
        setTimeout(() => {
          navigate("/admin/list-color")
        }, 300);
      } else {
        dispatch(createColor(values));
        formik.resetForm();
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {getColorId !== undefined ? 'Edit' : 'Add'} Color
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="color"
            name="color"
            onChan={formik.handleChange('title')}
            onBlur={formik.handleBlur('title')}
            val={formik.values.title}
            label="Enter Color"
            i_id="color"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title ? (
              <div>{formik.errors.title as React.ReactNode}</div>
            ) : null}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getColorId !== undefined ? 'Edit' : 'Add'} Color
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddColor;
