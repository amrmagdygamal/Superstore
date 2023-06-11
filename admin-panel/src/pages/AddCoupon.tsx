import { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { createBrand, resetState } from '../features/brand/brandSlice';
import { AppDispatch } from '../app/store';

const schema = yup.object().shape({
  name: yup.string().required('Brand Name is Required'),
});
const Addbrand = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isSuccess, isError, isLoading, createdBrand } = useSelector((state: any) => state.brand.brands);

  useEffect(() => {
    if (isSuccess && createdBrand) {
      toast.success('Brand Added Successfullly!');
    }else if (isError) {
      toast.error('Something Went Wrong!');
    }
  }, [isSuccess, isError, isLoading]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createBrand(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 8000)
    },
  });
  
  return (
    <div>
      <h3 className="mb-4 title">Add Coupon</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="name"
            onChan={formik.handleChange('name')}
            onBlur={formik.handleBlur('name')}
            val={formik.values.name}
            label="Enter Coupon Name"
            i_id="brand"
          />
          <div className="error">
            {formik.touched.name && formik.errors.name ? (
              <div>{formik.errors.name}</div>
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
