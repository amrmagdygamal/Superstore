/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import * as Yup from 'yup';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { loginUser } from '../features/user/userSlice';
import { useSelector } from 'react-redux';

const loginSchema = Yup.object().shape({

  email: Yup.string().email("Enter valid Email").required('Email is Required'),
  password: Yup.string()
    .required('Please enter a password'),
});

  const LoginPage = () => {
  
  
  const dispatch: AppDispatch = useDispatch();
  const userState = useSelector((state: any) => state.user)

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values));
    },
  });

  useEffect(() => {
    if(userState?.user !== undefined) {
      navigate("/")
    }
  }, [userState])
  return (
    <>
      <Meta title="Login Page" />
      <BreadCrumb title="Login Page" />
      <Container class1="auth-wrapper py-5 home-wrapper-2">
        <div className="col-12">
          <div className="auth-card">
            <h3 className="text-center mb-3">Please Login To Continue</h3>
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group className="mb-3" controlId="email">
              <Form.Control
                  name="email"
                  className="form-input h-50 py-3"
                  type="email"
                  placeholder="Email"
                  onChange={formik.handleChange('email')}
                  onBlur={formik.handleBlur('email')}
                  value={formik.values.email}
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
                  type="password"
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
              <Link to="/forgot-password">Forgot Passowrd</Link>
              <div className="my-3 d-flex gap-4 justify-content-center">
                <button className="button" type="submit">
                  Login
                </button>

                <Link
                  className="button signup"
                  to={`/signup`}
                >
                  SignUp
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default LoginPage;
