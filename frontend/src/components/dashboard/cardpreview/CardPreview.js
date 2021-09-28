import React, { useState } from 'react'


import { Component } from 'react'

import { Link } from 'react-router-dom'
import { CommentCount, Pencil, ArrowButton } from '../../Icons'
// import { ShareOptions } from '../../ShareOptions'
import Note from '../../note/Note'
import './CardPreview.css'
import { NewNote } from '../../newnote/NewNote'



// idhar fetch krna



export const NewCard = () => {
	return (
		<div className="new-card-wrapper">
			<Link to='/newnote'>
				<div className="create-new-card">
					<div className="new-card">
						<Pencil />
						New
					</div>
				</div>
			</Link>
		</div>
	)
}



export const SearchBox = () => {
	return (
		<div className="search-wrapper">
			<input type="search" value='' />
			<div className="search-button" onSubmit=''><ArrowButton width="3em" /></div>
		</div>
	)
}





export default class CardPreview extends Component {

	state = {
		data: [{
			"id": "9d255d4e-4f02-4eb9-a867-007784d0617b",
			"note_title": "Title Here",
			"content": "Content Here",
			"time_created": "2021-09-27T13:49:44.791306Z",
			"time_last_edited": "2021-09-27T13:49:44.791306Z",
			"is_public": false
		}]
	}

	async componentDidMount() {
		const url = "http://127.0.0.1:8000/api/v1/notes/";
		var key = localStorage.getItem("key")
		const response = await fetch(url, {
			method: "GET",

			headers: {
				Authorization: `Token ${key}`,
				"Content-Type": "application/json",
			}
		});
		const data = await response.json();
		this.setState({ data: data })
	}

	async sortTitle() {
		var key = localStorage.getItem("key")
		if (key) {
			const response = await fetch("http://127.0.0.1:8000/api/v1/notes/?ordering=note_title", {
				method: "GET",

				headers: {
					Authorization: `Token ${key}`,
					"Content-Type": "application/json",
				}
			});
			const data = await response.json();
			this.setState({ data: data })
		}
		else { console.log("redirect to login page") }
	}

	render() {
		var notes = this.state.data
		console.log("-->", notes)
		return (
			<div>

				<div className="card-outer-wrapper">
					{
						notes.map(function (note, index) {
							return (
								<Link to={`/Note/${note.id}`}>
									<div key={index} className="notes-wrapper">
										<div className="card-folder">
											<div className="card-header">
												<h1 className="card-title">{note.note_title}</h1>
												<div className="break"></div>
											</div>

											<div className="card-description">
												{note.content}
											</div>
											<div className="card-footer">
												<p className="date-created">{new Intl.DateTimeFormat('en-GB', { dateStyle: 'short', timeStyle: 'short' }).format((Date.parse(note.time_created)))}</p>
												<span className="comment-count"><CommentCount />6</span>
											</div>

										</div>
									</div>
								</Link>
							)
						})

					}
				</div>
			</div>
		)
	}
}
