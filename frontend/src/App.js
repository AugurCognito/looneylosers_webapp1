import React, { Fragment } from "react";
import "./App.css";
import Login from "./components/loginregister/Login";
import Register from "./components/loginregister/Register";
import { EditProfile } from "./components/editprofile/EditProfile";
// import { AllNotes } from './components/AllNotes';
import { Dashboard } from "./components/dashboard/Dashboard";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import Note from "./components/note/Note";
import { NewNote } from "./components/newnote/NewNote";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Profile, NoteIt } from "./components/Icons";
// import { Switch } from "@material-ui/core";
// import AlertBox from './components/alert/AlertBox'
// import { Temp } from "./components/Temp";
// import MDEditor from '@uiw/react-md-editor';
// import SimpleMDE from "react-simplemde-editor"; 
// import "easymde/dist/easymde.min.css"; 
// import { ProfileNavigation } from "./components/profilenavigation/ProfileNavigation";


var key = null;


function logoutfunc() {
  fetch("http://127.0.0.1:8000/api/v1/rest-auth/logout/", {
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
           
              <li><Link to="/note">note</Link></li>
              <li><Link to="/editprofile">Edit Profile</Link></li>
              <li><button onClick={logoutfunc}><Link to='/Login'>log out</Link></button> </li>
            </ul>
          <div className="socials">
            <div className="github-link">
              Github
            </div>
          </div>
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
