import React from 'react'
import { DropDown } from './DropDown'



export const Navbar = () => {
	let profilesettings = () => {
		<DropDown />
	}
	
	return (
		<div class="navbar">
			<img src="#" alt="Logo" className="logo" />
			<div className="search-wrapper">
				<input type="text" className="search-bar" />
				<button className="search">Search</button>
			</div>
			<img src="./" alt="Profile" onClick={ profilesettings } />
		</div>
	);
}
