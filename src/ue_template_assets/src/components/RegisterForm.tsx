import React, { useState } from 'react';

function RegisterForm({ createUser }: any) {
  const [loadingRegister, setLoadingRegister] = useState(false)

  const userCreation = async(e: any) => {
    setLoadingRegister(true)
    await createUser(e)
    setLoadingRegister(false)
  }

  return (
    <>
    <div className="register-form">
      <form className="form-box">
        <p>Register</p>
        <input type="text" id="inputName" placeholder="Place your name (optional)" />
        <input type="text" id="inputSurname" placeholder="Place your surname (optional)" />
        <input type="text" id="inputUsername" placeholder="Place your username" required/>
        <button className="form-submit" onClick={ (e: any) => userCreation(e) }><b>Submit</b></button>
      </form>
    </div> 
    { loadingRegister && 
      <div className="loading-modal">
        <div className="loading-spinner"></div>
        <div> Registering... </div>
      </div> 
    }
    </>
  );
}

export default RegisterForm;