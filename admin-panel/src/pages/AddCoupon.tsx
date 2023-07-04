import { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation} from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import {
  CouponInfo,
  createCoupon,
  getCoupon,
  resetState,
  updateCoupon,
} from '../features/coupon/couponSlice';
import { AppDispatch } from '../app/store';

const schema = yup.object().shape({
  name: yup.string().required('Coupon Name is Required'),
  expiry: yup.date().required('Expiry date is Required'),
  discount: yup.number().required('Coupon Discount Percentage is Required'),
});


const AddCoupon = () => {
  
  const dispatch: AppDispatch = useDispatch();
  
  const location = useLocation();
  const getCouponId = location.pathname.split('/')[3];

  const {
    couponName,
    couponExpiry,
    couponDiscount,
  } = useSelector((state: any) => state.coupon);

  useEffect(() => {
    if (getCouponId !== undefined) {
      dispatch(getCoupon(getCouponId));
    } else {
      dispatch(resetState());
    }
  }, [getCouponId]);




  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: couponName ||'',
      expiry: couponExpiry ||'',
      discount: couponDiscount ||'',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getCouponId !== undefined) {
        const data: CouponInfo = { _id: getCouponId, name: values.name, expiry: values.expiry, discount: values.discount };
        dispatch(updateCoupon(data));
      } else {
        dispatch(createCoupon(values));
        formik.resetForm();
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">{getCouponId !== undefined ? 'Edit' : 'Add'} Coupon</h3>
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
              <div>{formik.errors.name as React.ReactNode}</div>
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
              <div>{formik.errors.expiry as React.ReactNode}</div>
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
              <div>{formik.errors.discount as React.ReactNode}</div>
            ) : null}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getCouponId !== undefined ? 'Edit' : 'Add'} Coupon
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCoupon;
