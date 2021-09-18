import React from 'react'
import {OtherLogin} from './Subelements/Input'
import {Input} from './Subelements/Input'


export class Login extends React.Component {
	render(){
		return(
				<div className="login container">
					<a href="#" className="closebutton"><img src="" alt="close" /></a>
					<img src="" alt="logo" className="logo" />
					<div className="alternative">Login using</div>
					<OtherLogin />
					<form action="/" class="login-form">
						<Input />
						<div className="alternative">Don't have an account? <a href="#">Sign in</a></div>
						<input type="submit" value="Save"/>
					</form>
				</div>
		);
	}
}