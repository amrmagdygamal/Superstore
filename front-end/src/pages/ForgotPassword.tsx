import React, { useState } from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import { Form } from 'react-bootstrap';

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState();
  return (
    <>
      <Meta title="Contact Us" />
      <BreadCrumb title="Contact Us" />
      <div className="auth-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Reset Your Password</h3>
              <p className='mt-2 mb-3 text-center'>We will send send you an email to reset your password</p>
              <Form onSubmit={isLoading}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    className="form-input"
                    required
                    onChange={(e) => {e}}
                  />
                </Form.Group>
                <div className="flex-column d-flex align-items-center gap-3">
                  <button className="button" disabled={isLoading} type="submit">
                    Submit
                  </button>

                  <Link
                    
                    to="/login"
                  >
                    Cancel
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

export default ForgotPassword;
