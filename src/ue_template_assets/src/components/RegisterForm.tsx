import React from 'react';

function RegisterForm({ createUser }: any) {
  return (
    <div className="register-form">
      <form className="form-box">
        <p>Register</p>
        <input type="text" id="inputName" placeholder="Place your name (optional)" />
        <input type="text" id="inputSurname" placeholder="Place your surname (optional)" />
        <input type="text" id="inputUsername" placeholder="Place your username" required/>
        <button className="form-submit" onClick={ (e: any) => createUser(e) }><b>Submit</b></button>
      </form>
    </div> 
  );
}

export default RegisterForm;