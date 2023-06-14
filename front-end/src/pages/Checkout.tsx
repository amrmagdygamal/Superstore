import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CheckOutSteps from '../components/CheckOutSteps';
import { Nav } from 'react-bootstrap';
import Meta from '../components/Meta';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Container from '../components/Container';

const Checkout = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   if(!userInfo) {
  //     navigate('/login?redirect=/shipping')

  //   }
  // }, [userInfo, navigate])


  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();

    navigate('/payment');
  };

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
                  name="first-name"
                  id=""
                />
              </div>
              <div className="flex-grow-1">
                <input
                  type="text"
                  placeholder="Last Name"
                  className="form-control"
                  name="last-name"
                  id=""
                />
              </div>
              <div className="w-100">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Address"
                  name="address"
                  id=""
                />
              </div>
              <div className="w-100">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Apartment, Suuite, etc"
                  name="address"
                  id=""
                />
              </div>
              <div className="flex-grow-1">
                <input
                  type="text"
                  name="city"
                  placeholder="City "
                  id=""
                  className="form-control"
                />
              </div>
              <div className="flex-grow-1">
                <select name="state" className="form-control form-select" id="">
                  <option value="" selected disabled>
                    Select State
                  </option>
                </select>
              </div>
              <div className="flex-grow-1">
                <input
                  type="text"
                  name="zipcode"
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
                  <span className="badge position-absolute bg-secondary text-white rounded-circle p-2">
                    1
                  </span>
                  <img
                    src="/images/Apple_watch.webp"
                    className="img-fluid"
                    alt="product"
                  />
                </div>
                <div className="">
                  <h5 className="total-price">Apple watch </h5>
                  <p className="total-price">
                    But I don't need it I need a phonet
                  </p>
                </div>
              </div>
              <div className="flex-grow-1">
                <h5 className="total">$ 100</h5>
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
