import { useState, useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import { userSigninMutation } from '../hooks/userHooks';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import { ApiError } from '../types/ApiErrors';
import { Form } from 'react-bootstrap';
import LoadingBox from '../components/LoadingBox';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';

const LoginPage = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  const { mutateAsync: login, isLoading } = userSigninMutation();

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const data = await login({
        email,
        password,
      });
      dispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect);
    } catch (error) {
      toast.error(getError(error as ApiError));
    }
  };

  useEffect(() => {
    if (userInfo) navigate(redirect);
  }, [navigate, redirect, userInfo]);

  return (
    <>
      <Meta title="Login Page" />
      <BreadCrumb title="Login Page" />
      <div className="auth-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="auth-card">
                <h3 className="text-center mb-3">Login</h3>
                <Form onSubmit={submitHandler}>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      className="form-input"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="password">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      className="form-input"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Link to="/forgot-password">Forgot Passowrd</Link>
                  <div className="my-3 d-flex gap-4 justify-content-center">
                    <button
                      className="button"
                      disabled={isLoading}
                      type="submit"
                    >
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
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
