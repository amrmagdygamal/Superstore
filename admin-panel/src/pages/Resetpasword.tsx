import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { useSelector } from 'react-redux';
import {  useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import CustomInput from '../components/CustomInput';

const resetPassSchema = Yup.object().shape({
  password: Yup.string()
    .required('Please enter a password')
    // check minimum characters
    .min(8, 'Password must have at least 8 characters'),
  confirmPassword: Yup.string()
    .required('Confirm Password is Required')
    .oneOf([Yup.ref('password'), ''], 'Passwords must match'),
});



const Resetpassword = () => {
  const dispatch: AppDispatch = useDispatch();
  const userState = useSelector((state: any) => state.user);
  const location = useLocation();

  const getToken =location.pathname.split("/")[2]

  const navigate = useNavigate();

  
  
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: resetPassSchema,
    onSubmit: async (data) => {
      // dispatch(rese({token: getToken, password: data.password
      // }))
      console.log("hldkfj");
      
    }
  });



  return (
    <>
      <div
        className="py-5"
        style={{ backgroundColor: '#ffd333', minHeight: '100vh' }}
      >
        <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
          <h3 className="text-center title">Reset Password</h3>
          <p className="text-center">Create A new Password</p>
          <form action="">
            <CustomInput
                name="password"
                i_class="form-input h-50 py-3"
                type="password"
                label="Password"
                onChan={formik.handleChange('password')}
                onBlur={formik.handleBlur('password')}
                val={formik.values.password}
              />
              <div className="error mb-4">
                {formik.touched.password && formik.errors.password ? (
                  <div>{formik.errors.password}</div>
                ) : null}
              </div>

            <CustomInput
                name="password"
                i_class="form-input h-50 py-3"
                type="password"
                label="Confirm Password"
                onChan={formik.handleChange('confirmPassword')}
                onBlur={formik.handleBlur('confirmPassword')}
                val={formik.values.confirmPassword}
              />
              <div className="error mb-4">
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <div>{formik.errors.confirmPassword}</div>
                ) : null}
              </div>
            <button
              className="border-0 px-3 py-2 text-white fw-bold w-100"
              style={{ backgroundColor: '#ffd333' }}
              type="submit"
            >
              Save Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Resetpassword;
