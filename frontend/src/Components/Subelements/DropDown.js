import React, { Component } from 'react'
import { Dashboard } from '../Dashboard'
import { EditProfile } from '../EditProfile'
import { Input } from './Input'

export class DropDown extends Component {
	constructor(){
		super()
		this.state = [
			{
				message: 'Edit profile'
			},
			{
				message: 'Delete Profile'
			},
			{
				message: 'log out'
			}
		]
	}
	
	render() {
		return (
			<div>
				<EditProfile onClick={this.state.message} />
				<Dashboard onClick={this.state.message} />
				<Input onClick={this.state.message} />
			</div>
		)
	}
}

export default DropDown
