import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { CountryList } from 'react-select-country-list';
import { Link, useNavigate } from 'react-router-dom';
import CheckOutSteps from '../components/CheckOutSteps';
import { Nav } from 'react-bootstrap';
import Meta from '../components/Meta';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Container from '../components/Container';
import { AppDispatch } from '../app/store';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createOrder } from '../features/order/orderSlice';

const signUpSchema = Yup.object().shape({
  firstName: Yup.string().required('FirstName is Required'),
  lastName: Yup.string().required('LastName is Required'),

  country: Yup.string().required('Country is Required'),
  city: Yup.string().required('City is Required'),
  postalCode: Yup.string().required('PostalCode is Required'),
});

const Checkout = () => {
  const dispatch: AppDispatch = useDispatch();

  const cartState = useSelector((state: any) => state.use.cart);
  const orderState = useSelector((state: any) => state.order);
  const { isLoading, isError, isSuccess, crOrder} = orderState;
  const navigate = useNavigate();


  const round2 = (num: number) => Number(num.toFixed(2));


  const arabCountries = [
    { name: 'Palestine', code: 'PS' },
    { name: 'Algeria', code: 'DZ' },
    { name: 'Bahrain', code: 'BH' },
    { name: 'Comoros', code: 'KM' },
    { name: 'Djibouti', code: 'DJ' },
    { name: 'Egypt', code: 'EG' },
    { name: 'Iraq', code: 'IQ' },
    { name: 'Jordan', code: 'JO' },
    { name: 'Kuwait', code: 'KW' },
    { name: 'Lebanon', code: 'LB' },
    { name: 'Libya', code: 'LY' },
    { name: 'Mauritania', code: 'MR' },
    { name: 'Morocco', code: 'MA' },
    { name: 'Oman', code: 'OM' },
    { name: 'Qatar', code: 'QA' },
    { name: 'Saudi Arabia', code: 'SA' },
    { name: 'Somalia', code: 'SO' },
    { name: 'Sudan', code: 'SD' },
    { name: 'Syria', code: 'SY' },
    { name: 'Tunisia', code: 'TN' },
    { name: 'United Arab Emirates', code: 'AE' },
    { name: 'Yemen', code: 'YE' },
  ];
  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();

    navigate('/payment');
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      country: '',
      city: '',
      address: "",
      postalCode: '',
    },
    validationSchema: signUpSchema,
    onSubmit: async (orderData) => {
      try {
        await dispatch(createOrder(orderData));
        if (isSuccess && crOrder) {
          formik.resetForm();
          setTimeout(() => {
            navigate('/login/');
          }, 900);
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <>
      <Meta title="Checkout" />
      <div className="home-wrapper-2 py-3">
        <CheckOutSteps step1 step2></CheckOutSteps>
      </div>
      <Container class1="checkout home-wrapper-2 py-5">
        <div className="col-7">
          <div className="checkout-left">
            <h2 className="web-logo">
              <b>Super Store</b>
            </h2>
            <Nav
              style={{ '--bs-breadcrumb-divider': '>' } as any}
              aria-label="breadcrumb"
            >
              <ol className="breadcrumb align-items-center">
                <li className="breadcrumb-item total-price">
                  <Link to="/cart" className="text-dark">
                    Cart
                  </Link>
                </li>
                <IoIosArrowForward className="mx-1" />
                <li className="breadcrumb-item total-price">
                  <Link to="/checkout" className="text-dark">
                    Information
                  </Link>
                </li>
                <IoIosArrowForward className="mx-1" />
                <li
                  className="breadcrumb-item total-price active"
                  aria-current="page"
                >
                  Shipping
                </li>
                <IoIosArrowForward className="mx-1" />
                <li
                  className="breadcrumb-item total-price active"
                  aria-current="page"
                >
                  Payment
                </li>
              </ol>
            </Nav>
            <h4 className="title total">Contact Information</h4>
            <p className="user-details total">
              Amr Magdy (amroraker@gmail.com)
            </p>
            <h4 className="mb-3">Shipping Address</h4>
            <form
              action=""
              className="d-flex flex-wrap gap-2 justify-content-between"
              onSubmit={formik.handleSubmit}
            >
              <div className="w-100">
                <select
                  name="country"
                  className="form-control form-select"
                  id="country"
                  onChange={formik.handleChange('country')}
                  onBlur={formik.handleBlur('country')}
                  value={formik.values.country}
                >
                  <option value="" selected disabled>
                    Select Country
                  </option>
                  {arabCountries.map((country) => (
                    <option key={country.code} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
                <div className="error mb-4">
                  {formik.touched.country && formik.errors.country ? (
                    <div>{formik.errors.country}</div>
                  ) : null}
                </div>
              </div>
              <div className="flex-grow-1">
                <input
                  type="text"
                  placeholder="First Name"
                  className="form-control"
                  name="first-name"
                  onChange={formik.handleChange('firstName')}
                  onBlur={formik.handleBlur('firstName')}
                  value={formik.values.firstName}
                />
                  <div className="error mb-4">
                  {formik.touched.firstName && formik.errors.firstName ? (
                    <div>{formik.errors.firstName}</div>
                  ) : null}
                </div>
              </div>
              <div className="flex-grow-1">
                <input
                  type="text"
                  placeholder="Last Name"
                  className="form-control"
                  name="last-name"
                  id=""
                  onChange={formik.handleChange('lastName')}
                  onBlur={formik.handleBlur('lastName')}
                  value={formik.values.lastName}
                />
                  <div className="error mb-4">
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <div>{formik.errors.lastName}</div>
                  ) : null}
                </div>
              </div>
              <div className="w-100">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Apartment, Suuite, state, etc"
                  name="address"
                  id="address"
                  onChange={formik.handleChange('address')}
                  onBlur={formik.handleBlur('address')}
                  value={formik.values.address}
                />
                  <div className="error mb-4">
                  {formik.touched.address && formik.errors.address ? (
                    <div>{formik.errors.address}</div>
                  ) : null}
                </div>
              </div>
              <div className="flex-grow-1">
                <input
                  type="text"
                  name="city"
                  placeholder="City "
                  id=""
                  className="form-control"
                  onChange={formik.handleChange('city')}
                  onBlur={formik.handleBlur('city')}
                  value={formik.values.city}
                />
                  <div className="error mb-4">
                  {formik.touched.city && formik.errors.city ? (
                    <div>{formik.errors.city}</div>
                  ) : null}
                </div>
              </div>
              <div className="flex-grow-1">
                <input
                  type="text"
                  name="zipcode"
                  id="postalcode"
                  placeholder="Zipcode"
                  className="form-control"
                />
                  <div className="error mb-4">
                  {formik.touched.postalCode && formik.errors.postalCode ? (
                    <div>{formik.errors.postalCode}</div>
                  ) : null}
                </div>
              </div>
              <div className="w-100">
                <div className="d-flex py-3 justify-content-between align-items-center">
                  <Link className="text-dark" to="/cart">
                    <IoIosArrowBack className="fs-4 me-2" />
                    Return to Cart
                  </Link>
                  <Link className="button" to="/placeorder">
                    Continue to Shipping
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="col-5">
          {cartState &&
            cartState?.products?.map((product: any) => {
              return (
                <div key={product?.product._Id} className="border-bottom py-4">
                  <div className="d-flex gap-2 align-items-center">
                    <div className="w-75 d-flex gap-2">
                      <div className="w-25 position-relative">
                        <span className="badge position-absolute bg-secondary text-white rounded-circle p-2">
                          {product?.quantity}
                        </span>
                        <img
                          src={product?.image}
                          className="img-fluid"
                          alt="product"
                        />
                      </div>
                      <div className="">
                        <h5 className="total-price">
                          {product?.product?.name}{' '}
                        </h5>
                        <p
                          dangerouslySetInnerHTML={{ __html: product?.price }}
                          className="total-price"
                        ></p>
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <h5 className="total">
                        $ {product?.price * product?.quantity}
                      </h5>
                    </div>
                  </div>
                </div>
              );
            })}

          <div className="border-bottom py-4">
            <div className="d-flex justify-content-between align-items-center">
              <p>Subtotal</p>
              <p>$ {cartState.cartTotal}</p>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <p className="mb-0 total">Shipping</p>
              <p className="mb-0 total-price">$ 20</p>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center border-bottom py-4">
            <h4 className="total">Total</h4>
            <h5 className="total-price">$ 200</h5>
          </div>
          <div></div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
