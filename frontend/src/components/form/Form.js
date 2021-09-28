import React from 'react'
import { useForm } from 'react-hook-form';




export const Form = () => {

	const { register, handleSubmit } = useForm();

	return (
		<form onSubmit={handleSubmit(data => saveData(data))}>
			<h1>This form is about</h1>
			<input type="email" id="email" placeholder="Email" ref={register} />
			<input type="text" id="username" placeholder="Username" ref={register({ required: true })} />
			<input type="password" id="password" placeholder="Password" ref={register({ required: true })} />
			<input type="password" id="confirmPassword" placeholder="Confirm Password" ref={register({ required: true })} />
			<input type="submit" />
		</form>
		// <div>

		// </div>
	)
}

