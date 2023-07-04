import { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { login } from '../features/auth/authSlice';


const Login = () => {

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();


  const authState = useSelector((state: RootState) => state.auth);




  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Email Should valid')
      .required('Email is Required'),
    password: Yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });
  const adminInf = JSON.parse(localStorage.getItem("admin") || "{}")

  useEffect(() => {
    if(adminInf?.username !== undefined) {
      navigate("/admin")
    } else {
      navigate("/")
    }
  }, [adminInf?.username])

  return (
    <>
      <div
        className="py-5"
        style={{ backgroundColor: '#ffd333', minHeight: '100vh' }}
      >
        <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
          <h3 className="text-center title">Login</h3>
          <p className="text-center">Login to your account to continue.</p>
          <div className="error text-center">
            {authState?.message == "Rejected" ? "You are not an Admin" : ""}
          </div>
          <form action="" onSubmit={formik.handleSubmit}>
            <CustomInput
              type="email"
              label="Email Address"
              name="email"
              onChan={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
              val={formik.values.email}
            />
            <div className="error">
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
            </div>
            <CustomInput
              type="password"
              label="Password"
              name="password"
              onChan={formik.handleChange('password')}
              onBlur={formik.handleBlur('password')}
              val={formik.values.password}
            />
            <div className="error mb-3">
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
            </div>
            <button
              className="border-0 px-3 py-2 text-white fw-bold w-100"
              style={{ backgroundColor: '#ffd333' }}
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
