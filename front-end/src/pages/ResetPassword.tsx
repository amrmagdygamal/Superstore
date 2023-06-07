import React, { useState } from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import { Form } from 'react-bootstrap';

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState();
  return (
    <>
      <Meta title="Reset Password" />
      <BreadCrumb title="Reset Password" />
      <div className="auth-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Reset Your Password</h3>
              <Form onSubmit={isLoading}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    className="form-input"
                    required
                    onChange={(e) => {e}}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    className="form-input"
                    required
                    onChange={(e) => {e}}
                  />
                </Form.Group>
                <div className="flex-column d-flex align-items-center gap-3">
                  <button className="button" disabled={isLoading} type="submit">
                    Save Password
                  </button>

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

export default ResetPassword;
