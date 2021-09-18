import React from 'react'
import { Input } from './Subelements/Input';

export class EditProfile extends React.Component {
	render() {
		return (
			<div class="edit-profile container">
				<a href="#" className="closebutton"><img src="" alt="close" /></a>
				<form action="/" class="change-account-details">
					<Input />
					<input type="password" id="password" placeholder="Confirm Password" />
					<input type="submit" value="Save" />
				</form>
				<a href="#" className="delete">Delete Account</a>
			</div>
		);
	}
}