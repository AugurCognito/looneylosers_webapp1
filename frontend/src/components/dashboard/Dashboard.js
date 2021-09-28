import React from 'react'
import CardPreview from './cardpreview/CardPreview'
import { Navbar } from '../navbar/Navbar'
import { Pencil, MoreOptions, MyNotes, SharedNotes, SortBy, DropDown, ArrowButton } from '../Icons';
import './Dashboard.css'
import { Link } from 'react-router-dom'
import Note from '../note/Note';
import { NewCard } from './cardpreview/CardPreview';
import { SearchBox } from './cardpreview/CardPreview'



export class Dashboard extends React.Component {
	render() {

	

		function sortCreated() {

		}
		function sortModified() {

		}
		function sortAtoZ() {

		}
		return (
			<div className='dashboard'>
				
				<div className="dashboard-header">
				<div className="dashboard-navbar">
					<div className="dashboard-menu">
						<a className="mynotes-button dashboard-switch active-tab" href="https://www.google.com"> <MyNotes /> My Notes</a>
						<a className="sharednotes-button dashboard-switch" href="https://www.google.com"><SharedNotes /> Shared Notes</a>
					</div>
					<SearchBox />


				</div>
				<div className="sortby">SortBy :
					<ul className="sortby-list">
						<li onClick={sortCreated} >Created</li>
						<li onClick={sortModified}>Modified</li>
						<li onClick={sortAtoZ}>A-Z </li>
					</ul>
				</div>
				</div>
			
				<div className="cards-wrapper">
					<NewCard />
					<CardPreview />
				</div>
			</div>
		);
	}
}