import React from 'react'


export const OtherLogin = () => {
	return (
	  <div>
			<a href=""><div className="google login"><img src="../Media/logos/LOGO.svg" alt="Google" /></div></a>
			<a href=""><div className="github login"><img src="" alt="GitHub" /></div></a>
	  </div>
	)
}

export const Input = () => {
	return (
		<div>
				<input type="text" id="username" placeholder="Username"/>
				<input type="password" id="password" placeholder="Password"/>
		</div>
	)
}
