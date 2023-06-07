import { useContext, useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { userSignUpMutation } from '../hooks/userHooks';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import { ApiError } from '../types/ApiErrors';
import { Store } from '../Store';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';

const SignUpPage = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const { mutateAsync: signup, isLoading } = userSignUpMutation();

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Password do not match');
      return;
    }

    try {
      const data = await signup({
        username,
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

  return (
    <>
      <Meta title="Sign Up Page" />
      <BreadCrumb title="Sign Up Page" />
      <div className="auth-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="auth-card">
                <h3 className="text-center mb-3">Create Account</h3>
                <Form onSubmit={submitHandler}>
                  <Form.Group className="mb-3" controlId="username">
                    <Form.Control
                      className="form-input h-50 py-3"
                      type="text"
                      placeholder="UserName"
                      onChange={(e) => setUserName(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="email">
                    <Form.Control
                      className="form-input h-50 py-3"
                      placeholder="Email"
                      type="email"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="password">
                    <Form.Control
                      className="form-input h-50 py-3"
                      placeholder="Password"
                      type="password"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="confirmPassword">
                    <Form.Control
                      className="form-input h-50 py-3"
                      placeholder="Confirm Password"
                      type="password"
                      required
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
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
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
