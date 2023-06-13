import { useContext, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { userSignUpMutation } from '../hooks/userHooks';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { getError } from '../utils';
import { ApiError } from '../types/ApiErrors';

import Meta from '../components/Meta';
import * as Yup from 'yup';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
import { resetState, signUpUser } from '../features/user/userSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';

const schema = Yup.object().shape({
  username: Yup.string().required('UserName is Required'),

  email: Yup.string().required('Description is Required'),
  password: Yup.string().required('Password is Required'),
  confirmPassword: Yup.string().required('Confirm Password is Required'),
});

const SignUpPage = () => {
  const dispatch: AppDispatch = useDispatch();

  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(signUpUser(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 300);
    },
  });

  return (
    <>
      <Meta title="Sign Up Page" />
      <BreadCrumb title="Sign Up Page" />
      <Container class1="auth-wrapper py-5 home-wrapper-2">
        <div className="col-12">
          <div className="auth-card">
            <h3 className="text-center mb-3">Create Account</h3>
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group className="mb-3" controlId="username">
                <Form.Control
                  name="name"
                  className="form-input h-50 py-3"
                  type="text"
                  placeholder="UserName"
                  onChange={formik.handleChange('uername')}
                  onBlur={formik.handleBlur('username')}
                  value={formik.values.username}
                />
                <div className="error mb-4">
                  {formik.touched.username && formik.errors.username ? (
                    <div>{formik.errors.username}</div>
                  ) : null}
                </div>
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Control
                  name="email"
                  className="form-input h-50 py-3"
                  type="text"
                  placeholder="Email"
                  onChange={formik.handleChange('email')}
                  onBlur={formik.handleBlur('email')}
                  value={formik.values.username}
                />
                <div className="error mb-4">
                  {formik.touched.email && formik.errors.email ? (
                    <div>{formik.errors.email}</div>
                  ) : null}
                </div>
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Control
                  name="password"
                  className="form-input h-50 py-3"
                  type="text"
                  placeholder="Password"
                  onChange={formik.handleChange('password')}
                  onBlur={formik.handleBlur('password')}
                  value={formik.values.password}
                />
                <div className="error mb-4">
                  {formik.touched.password && formik.errors.password ? (
                    <div>{formik.errors.password}</div>
                  ) : null}
                </div>
              </Form.Group>

              <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Control
                  name="password"
                  className="form-input h-50 py-3"
                  type="text"
                  placeholder="Confirm Password"
                  onChange={formik.handleChange('confirmPassword')}
                  onBlur={formik.handleBlur('confirmPassword')}
                  value={formik.values.confirmPassword}
                />
                <div className="error mb-4">
                  {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                    <div>{formik.errors.confirmPassword}</div>
                  ) : null}
                </div>
              </Form.Group>

              <div className="mb-3 d-flex justify-content-center gap-3 align-items-center">
                <button className="button" type="submit">
                  Sign Up
                </button>
                <Link
                  className="button signup"
                  to={`/login?redirect=${redirect}`}
                >
                  Sign-In
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SignUpPage;
