import { useState, useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import { userSigninMutation } from '../hooks/userHooks';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import { ApiError } from '../types/ApiErrors';
import { Form } from 'react-bootstrap';
import LoadingBox from '../components/LoadingBox';
import * as Yup from 'yup';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
import { useFormik } from 'formik';

const LoginPage = () => {
  
  
  const schema = Yup.object().shape({
    name: Yup.string().required('Name is Required'),
    images: Yup.array().required('').min(1, 'You should one Image'),
  
    description: Yup.string().required('Description is Required'),
    price: Yup.number().required('Price is Required'),
    brand: Yup.string().required('Brand is Required'),
    tag: Yup.string().required('Tag is Required'),
    category: Yup.string().required('Category is Required'),
    color: Yup.array()
      .min(1, 'Pick at least one color')
      .required('Color is Required'),
    countInStock: Yup.number().required('Quantity is Required'),
  });

  const dispatch: AppDispatch = useDispatch();
  
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: '',
      brand: '',
      category: '',
      countInStock: '',
      color: [],
      images: [],
      tag: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values))
      dispatch(createProduct(values));
      formik.resetForm();
      setColor([]);
      setTimeout(() => {
        dispatch(resetState());
      }, 8000);
    },
  });

  return (
    <>
      <Meta title="Login Page" />
      <BreadCrumb title="Login Page" />
      <Container class1="auth-wrapper py-5 home-wrapper-2">
        <div className="col-12">
          <div className="auth-card">
            <h3 className="text-center mb-3">Login</h3>
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Control
                  type="email"
                  name='email'
                  placeholder="Email"
                  className="form-input"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Control
                  type="password"
                  name='password'
                  placeholder="Password"
                  className="form-input"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Link to="/forgot-password">Forgot Passowrd</Link>
              <div className="my-3 d-flex gap-4 justify-content-center">
                <button className="button" disabled={isLoading} type="submit">
                  Login
                </button>

                <Link
                  className="button signup"
                  to={`/signup?redirect=${redirect}`}
                >
                  SignUp
                </Link>
                {isLoading && <LoadingBox />}
              </div>
            </Form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default LoginPage;
