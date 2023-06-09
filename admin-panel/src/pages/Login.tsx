

import React from 'react';
import CustomInput from '../components/CustomInput';
import {Link} from 'react-router-dom';

const Login = () => {
  return (
    <>
      <div className="py-5" style={{"backgroundColor": "#ffd333", "minHeight": "100vh"}}>

        <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
          <h3 className="text-center title">Login</h3>
          <p className="text-center">Login to your account to continue.</p>
          <form action="">
            <CustomInput type="email" label="Email Address" id="email" name="email" />
            <CustomInput type="password" label="Password" id="pass" name="email" />
            <div className="text-end mb-3">
              <Link to="/forgot-password">Forgot Password</Link>
            </div>
            <button
              className='border-0 px-3 py-2 text-white fw-bold w-100'
              style={{ "backgroundColor": "#ffd333"}}
              type='submit'
            >

              Login
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login;