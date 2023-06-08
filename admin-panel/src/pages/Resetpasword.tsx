

import React from 'react'
import CustomInput from '../components/CustomInput';

const Resetpassword = () => {
  return (
    <>
      <div className="py-5" style={{"backgroundColor": "#ffd333", "minHeight": "100vh"}}>

        <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
          <h3 className="text-center">Reset Password</h3>
          <p className="text-center">Create A  new Password</p>
          <form action="">
            <CustomInput type="password" label="New Password" id="pass" name="password" />
            <CustomInput type="password" label="Confirm Password" id="pass" name="password" />
            <button
              className='border-0 px-3 py-2 text-white fw-bold w-100'
              style={{ "backgroundColor": "#ffd333"}}
              type='submit'
            >
              Save Password
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Resetpassword;