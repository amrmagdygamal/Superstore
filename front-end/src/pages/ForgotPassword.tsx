import { useState } from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import { Form } from 'react-bootstrap';
import Container from '../components/Container';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { forgotPass } from '../features/user/userSlice';
import * as Yup from 'yup';


const loginSchema = Yup.object().shape({

  email: Yup.string().email("Enter valid Email").required('Email is Required'),

});

const ForgotPassword = () => {


  const dispatch: AppDispatch = useDispatch();
  const userState = useSelector((state: any) => state.user)


  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(forgotPass(values));
      // setTimeout(() => {
      //   if (userState.isSuccess) {
      //     navigate("/")
      //   }
      // }, 700)
    },
  });


  return (
    <>
      <Meta title="Contact Us" />
      <BreadCrumb title="Contact Us" />
      <Container class1="auth-wrapper py-5 home-wrapper-2">
        <div className="col-12">
          <div className="auth-card">
            <h3 className="text-center mb-3">Reset Your Password</h3>
            <p className="mt-2 mb-3 text-center">
              We will send send you an email to reset your password
            </p>
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
              <div className="flex-column d-flex align-items-center gap-3">
                <button className="button" type="submit">
                Send Email
                </button>

                <Link to="/login">Cancel</Link>
              </div>
            </Form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ForgotPassword;
