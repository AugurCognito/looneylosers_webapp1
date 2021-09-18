import React from 'react'
import { CardPreview } from './Subelements/CardPreview';
import { Navbar } from './Subelements/Navbar'



export class Dashboard extends React.Component {
	render(){
		return(
			<>
			<Navbar />
			<div className="dashboard-menu">
				<a className="mynotes-button" href="https://www.google.com"><img src="./" alt="My Notes" /> My Notes</a>
				<a className="mynotes-button" href="https://www.google.com"><img src="./" alt="shared notes" /> Shared Notes</a>
			</div>
			<div className="sortby">SortBy: Date Created <a href="./" className=""><img src="./" alt="Dropdown" /></a></div>
			<div className="create-new-card">
				<button className="new-card">
					New card
				</button>
			</div>
			<CardPreview />
			</>	
		);
	}
}