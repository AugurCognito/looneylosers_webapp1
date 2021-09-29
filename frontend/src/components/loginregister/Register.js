import React, { useState } from "react";
import { NoteIt, Google, Github, CloseButton } from "../Icons";

import { Link, Redirect } from "react-router-dom";


function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')

  const handleUsernameChange = event => {
    setUsername(event.target.value)
  };
  const handleEmailChange = event => {
    setEmail(event.target.value)
  };
  const handlePassword1Change = event => {
    setPassword1(event.target.value)
  };
  const handlePassword2Change = event => {
    setPassword2(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault();

    fetch("https://track1api.herokuapp.com/api/v1/rest-auth/registration/", {
      method: "POST",
      body: JSON.stringify({
        "username": username,
        "email": email,
        "password1": password1,
        "password2": password2
      }
      ),
      headers: { "content-type": "application/json" },
    }).then(response => response.json()).then(data =>
      localStorage.setItem("key", data["key"]))

    var key = localStorage.getItem('key');
    if (!key) {
      alert("Try again, maybe with better password")

    }
  };

  return (
    <div className="register-outer-wrapper">

    
    <div className="register-wrapper">
      <div className="left-register">
       <Link exact to='/'><CloseButton /></Link> 
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className='register-form'>
        
        <div>

          <input
            type="username"
            name="username"
            placeholder="Enter Username"
            onChange={handleUsernameChange}
            value={username}
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handleEmailChange}
            value={email}
          />
        </div>
        <div>
          <input
            type="password"
            name="password1"
            placeholder="Enter password"
            onChange={handlePassword1Change}
            value={password1}
          />
        </div>
        <div>
          <input
            type="password"
            name="password2"
            placeholder="Confirm Password"
            onChange={handlePassword2Change}
            value={password2}
          />
        </div>
        
      </form>
      </div>
      
      <div className="other-options">
        <div className="icon"><NoteIt width='10em' /></div>
        <p>Register using</p>
        <div className="alternate-login">
          <Google />
          <Github />
        </div>

      </div>
     
    </div>
    <div className="submit-sign-wrapper">
          <p>Already have an account? <Link to='/Login'>Sign in</Link></p>
          <div type="submit" className="submit-button" onClick={handleSubmit}>
            Submit
          </div>
        </div>
    </div>
  )
}

export default Register