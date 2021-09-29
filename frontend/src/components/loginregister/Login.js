import React, { useState } from "react";

import { NoteIt, Google, Github, CloseButton } from '../Icons'

import {Link, Redirect} from "react-router-dom";
import './LoginRegister.css'
import { useAsync } from "react-async"


function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = event => {
    setUsername(event.target.value)
  };
  const handlePasswordChange = event => {
    setPassword(event.target.value)
  };
  
  const HandleSubmit = event => {
    event.preventDefault();
    
    fetch("https://track1api.herokuapp.com/api/v1/rest-auth/login/",{
      method: "POST",
      body: JSON.stringify({
        "username": username,
        "password": password
        }
      ),
      headers: {Authorization: `Token ${localStorage.getItem("key")}`,"content-type": "application/json"}
    }).then(response => response.json()).then(data => 
    localStorage.setItem("key",data["key"]))
    var key = localStorage.getItem('key');
  };

  return (
    <div className="login-wrapper">
     <Link exact to='/'><CloseButton /></Link> 
        <h1>Login</h1>
       <div className="icon"><NoteIt width='10em'/></div> 
    <form onSubmit={HandleSubmit}>
      <div>
        <p>Via</p>
        <div className="alternate-login">
        <Google />
        <Github />
        </div>
      
        <input
          type="username" 
          name="username"
          placeholder="Username"
          onChange={handleUsernameChange}
          value={username}
        />
      </div>
      <div>
      
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          onChange={handlePasswordChange}
          value={password}
        />
      </div>
      <div className="submit-sign-wrapper">
        <p>Don't have any account? <Link to='/Register'>Sign up</Link></p>
        <div type="submit" className="submit-button" onClick={HandleSubmit}>
          Submit
        </div>
      </div>
    </form>
    </div>
  )
}

export default Login