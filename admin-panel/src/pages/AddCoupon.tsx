import { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { createCoupon, resetState } from '../features/coupon/couponSlice';
import { AppDispatch } from '../app/store';



const AddCoupon = () => {
  
  
  const schema = yup.object().shape({
    name: yup.string().required('Coupon Name is Required'),
    expiry: yup.date().required('Expiry date is Required'),
    discount: yup.number().required('Coupon Discount Percentage is Required'),
  });





  const dispatch: AppDispatch = useDispatch();
  

  const newcoupon = useSelector((state: any) => state.coupon);

  const { isLoading, isSuccess, isError, createdCoupon } = newcoupon;

  useEffect(() => {
    if (isSuccess && createdCoupon) {
      toast.success('Coupon Added Successfullly!');
    } else if (isError) {
      toast.error('Something Went Wrong!');
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: '',
      expiry: '',
      discount: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createCoupon(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 8000);
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
            i_id="Coupon"
          />
          <div className="error">
            {formik.touched.name && formik.errors.name ? (
              <div>{formik.errors.name}</div>
            ) : null}
          </div>
          <CustomInput
            type="date"
            name="expiry"
            onChan={formik.handleChange('expiry')}
            onBlur={formik.handleBlur('expiry')}
            val={formik.values.expiry}
            label="Enter Expiry Date"
            i_id="expiry"
          />
          <div className="error">
            {formik.touched.expiry && formik.errors.expiry ? (
              <div>{formik.errors.expiry}</div>
            ) : null}
          </div>
          <CustomInput
            type="number"
            name="discount"
            onChan={formik.handleChange('discount')}
            onBlur={formik.handleBlur('discount')}
            val={formik.values.discount}
            label="Enter Coupon Discount"
            i_id="discount"
          />
          <div className="error">
            {formik.touched.discount && formik.errors.discount ? (
              <div>{formik.errors.discount}</div>
            ) : null}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add Coupon
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCoupon;
