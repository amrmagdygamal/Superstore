import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import { Form } from 'react-bootstrap';
import Container from '../components/Container';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { useLocation} from 'react-router-dom';
import * as Yup from 'yup';
import { resetPass } from '../features/user/userSlice';

const resetPassSchema = Yup.object().shape({
  password: Yup.string()
    .required('Please enter a password')
    // check minimum characters
    .min(8, 'Password must have at least 8 characters'),
  confirmPassword: Yup.string()
    .required('Confirm Password is Required')
    .oneOf([Yup.ref('password'), ''], 'Passwords must match'),
});

const ResetPassword = () => {
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();

  const getToken = location.pathname.split('/')[2];


  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: resetPassSchema,
    onSubmit: async (data) => {
      dispatch(resetPass({ token: getToken, password: data.password }));
    },
  });

  return (
    <>
      <Meta title="Reset Password" />
      <BreadCrumb title="Reset Password" />
      <Container class1="auth-wrapper py-5 home-wrapper-2">
        <div className="col-12">
          <div className="auth-card">
            <h3 className="text-center mb-3">Reset Your Password</h3>
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="form-input"
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
              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Confirm Password"
                  className="form-input"
                  onChange={formik.handleChange('confirmPassword')}
                  onBlur={formik.handleBlur('confirmPassword')}
                  value={formik.values.confirmPassword}
                />
                <div className="error mb-4">
                  {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword ? (
                    <div>{formik.errors.confirmPassword}</div>
                  ) : null}
                </div>
              </Form.Group>
              <div className="flex-column d-flex align-items-center gap-3">
                <button className="button" type="submit">
                  Save Password
                </button>
              </div>
            </Form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ResetPassword;
