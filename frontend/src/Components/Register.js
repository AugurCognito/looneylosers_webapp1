import React from 'react'
import {OtherLogin} from './Subelements/Input'
import {Input} from './Subelements/Input'

export class Register extends React.Component {
	render() {
		return (

			<div className="register container">
				<a href="#" className="closebutton"><img src="" alt="close" /></a>
				<img src="" alt="logo" className="logo" />
				<div className="alternative">Login using</div>
				<OtherLogin />
				<form action="/" class="login-form">
				<input type="email" id="username" placeholder="Email"/>
					<Input />
					<input type="password" id="password" placeholder="Confirm Password"/>
					<div className="alternative">Don't have an account? <a href="#">Sign Up</a></div>
					<input type="submit" value="Save" />
				</form>
			</div>
		);
	}
}