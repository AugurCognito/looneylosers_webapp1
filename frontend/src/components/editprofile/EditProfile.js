import React, { useState } from 'react'

import { CloseButton, ArrowButton } from '../Icons'
import { Navbar } from '../navbar/Navbar';
// import { Profile } from '../Icons';
import './EditProfile.css'





export const EditProfile = () => {


	const ChangeUserInfo = () => {
		const [name, changeName] = useState('')
		const [email, changeEmail] = useState('')


	  	const handleNameChange = event => {
			changeName(event.target.value)
		};

	  	const handleEmailChange = event => {
			changeEmail(event.target.value)
		};
		return (
			<form onSubmit={saveChanges}>
				<input type="text" placeholder="Enter new name" onChange={handleNameChange} value={name} />
				<input type="email" placeholder="Enter new email" onChange={handleEmailChange} value={email} />

			</form>
		)
	}


	// const ChangePassword = () => {
	// 	return (
	// 		<div>
	// 			<input type="password" placeholder="Change Password" />
	// 			<input type="password" placeholder="Confirm new password" />
	// 		</div>
	// 	)
	// }

	function saveChanges() {


		fetch("https://track1api.herokuapp.com/api/v1/user/", {
			method: "PUT",
			body: JSON.stringify({
				"name": this.state.name,
				"email": this.state.email
			}),
			headers: {
				Authorization: `Token ${localStorage.getItem("key")}`,
				"Content-Type": "application/json",
			}
		})
	}



	return (
		<div>
			<Navbar />
			<div class="edit-profile container">
				<CloseButton />
				<div className="edit-profile-content">
					{/* <Profile width='170' height='200' /> */}
					<form action="/" class="change-account-details">
						<ChangeUserInfo />
						{/* <ChangePassword /> */}
						<button onClick={saveChanges}>Button</button>
					</form>
				</div>
				<a href="#" className="delete">Delete Account</a>
			</div>
		</div>
	)
}
