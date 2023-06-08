import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import { Helmet } from 'react-helmet-async';
import CheckOutSteps from '../components/CheckOutSteps';
import { Button, Form, Nav } from 'react-bootstrap';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const Checkout = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Store);

  const {
    userInfo,
    cart: { shippingAddress },
  } = state;

  // useEffect(() => {
  //   if(!userInfo) {
  //     navigate('/login?redirect=/shipping')

  //   }
  // }, [userInfo, navigate])

  const [fullName, setFullName] = useState(shippingAddress.fullName || '');
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ''
  );
  const [country, setCountry] = useState(shippingAddress.country || '');

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country,
      },
    });
    localStorage.setItem(
      'shippingAddress',
      JSON.stringify({
        fullName,
        address,
        city,
        postalCode,
        country,
      })
    );

    navigate('/payment');
  };

  return (
    <>
      <Meta title="Checkout" />
      <div className="home-wrapper-2 py-3">
        <CheckOutSteps step1 step2></CheckOutSteps>
      </div>
      <div className="checkout home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-7">
              <div className="checkout-left">
                <h2 className="web-logo"><b>Super Store</b></h2>
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
                    <li className="breadcrumb-item total-price active" aria-current="page">
                      Shipping
                    </li>
                    <IoIosArrowForward className="mx-1" />
                    <li className="breadcrumb-item total-price active" aria-current="page">
                      Payment
                    </li>
                  </ol>
                </Nav>
                <h4 className="title total">Contact Information</h4>
                <p className="user-details total">Amr Magdy (amroraker@gmail.com)</p>
                <h4 className="mb-3">Shipping Address</h4>
                <form
                  action=""
                  className="d-flex flex-wrap gap-2 justify-content-between"
                >
                  <div className="w-100">
                    <select name="" className="form-control form-select" id="">
                      <option value="" selected disabled>
                        Select Country
                      </option>
                    </select>
                  </div>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="form-control"
                      name=""
                      id=""
                    />
                  </div>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="form-control"
                      name=""
                      id=""
                    />
                  </div>
                  <div className="w-100">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Address"
                      name=""
                      id=""
                    />
                  </div>
                  <div className="w-100">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Apartment, Suuite, etc"
                      name=""
                      id=""
                    />
                  </div>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      name=""
                      placeholder="City "
                      id=""
                      className="form-control"
                    />
                  </div>
                  <div className="flex-grow-1">
                    <select name="" className="form-control form-select" id="">
                      <option value="" selected disabled>
                        Select State
                      </option>
                    </select>
                  </div>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="Zipcode"
                      className="form-control"
                    />
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
              <div className="border-bottom py-4">
                <div className="d-flex gap-2 align-items-center">
                  <div className="w-75 d-flex gap-2">
                    <div className="w-25 position-relative">
                      <span className='badge position-absolute bg-secondary text-white rounded-circle p-2'>1</span>
                      <img
                        src="/images/Apple_watch.webp"
                        className="img-fluid"
                        alt="product"
                      />
                    </div>
                    <div className="">
                      <h5 className='total-price'>Apple watch </h5>
                      <p className='total-price'>But I don't need it I need a phonet</p>
                    </div>
                  </div>
                <div className="flex-grow-1">
                  <h5 className='total'>$ 100</h5>
                </div>
                </div>
              </div>
              <div className="border-bottom py-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p>Subtotal</p>
                  <p>$ 200</p>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0 total">Shipping</p>
                  <p className="mb-0 total-price">$ 100</p>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center border-bottom py-4">
                <h4 className='total'>Total</h4>
                <h5 className='total-price'>$ 200</h5>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
