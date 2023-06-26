import { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate} from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import {
  BrandInfo,
  createBrand,
  getBrand,
  resetState,
  updateBrand,
} from '../features/brand/brandSlice';
import { AppDispatch } from '../app/store';

const schema = yup.object().shape({
  title: yup.string().required('Brand Name is Required'),
});
const Addbrand = () => {
  const dispatch: AppDispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();
  const getBrandId = location.pathname.split('/')[3];
  console.log(getBrandId);

  const {
    brandName,
  } = useSelector((state: any) => state.brand);

  useEffect(() => {
    if (getBrandId !== undefined) {
      dispatch(getBrand(getBrandId));
    } else {
      dispatch(resetState());
    }
  }, [getBrandId]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: brandName || '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getBrandId !== undefined) {
        const data: BrandInfo = { _id: getBrandId, title: values.title };
        dispatch(updateBrand(data));
        setTimeout(() => {
          navigate("/admin/list-brand")
        }, 300);
      } else {
        dispatch(createBrand(values));
        formik.resetForm();
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {getBrandId !== undefined ? 'Edit' : 'Add'} Brand
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="title"
            onChan={formik.handleChange('title')}
            onBlur={formik.handleBlur('title')}
            val={formik.values.title}
            label="Enter Brand"
            i_id="brand"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title ? (
              <div>
                <p>{formik.errors.title as React.ReactNode}</p>
              </div>
            ) : null}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getBrandId !== undefined ? 'Edit' : 'Add'} Brand
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addbrand;
