import React, { Fragment } from "react";
import "./App.css";
import Login from "./components/loginregister/Login";
import Register from "./components/loginregister/Register";
import { EditProfile } from "./components/editprofile/EditProfile";
import { Dashboard } from "./components/dashboard/Dashboard";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import Note from "./components/note/Note";
import { NewNote } from "./components/newnote/NewNote";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Profile, NoteIt } from "./components/Icons";


var key = null;


function logoutfunc() {
  fetch("https://track1api.herokuapp.com/api/v1/rest-auth/logout/", {
    method: "POST",
    body: JSON.stringify({
      "key": localStorage.getItem('key'),
    }
    ),
    headers: { "content-type": "application/json" },
  })
  localStorage.clear("key")
  alert("sucessfully logged out!!!")
}


function App() {
  return (

    <div className="App">
    
        <Router>
          <nav className="sidebar-panel">
          
          <NoteIt width='10em'/>
          <Profile width='5em'/>
            <ul>
              <li><Link to="/">Dashboard</Link></li>
              <li><Link to="/editprofile">Edit Profile</Link></li>
              <li><button onClick={logoutfunc}><Link to='/Login'>log out</Link></button> </li>
            </ul>
          
            <a className="github-link" href="https://github.com/AugurCognito/looneylosers_webapp1">
              Source Code
            </a>
          
          </nav>
          <Switch>
            <Route path='/' exact component={Dashboard} />
            <Route path='/login' component={Login} />
            <Route path='/note' component={Note} />
            <Route path='/editprofile' component={EditProfile} />
            <Route path='/register' component={Register} />
            <Route path='/newnote' component={NewNote} />
          </Switch>
        </Router>
      </div>
    
  );
}

export default App;
