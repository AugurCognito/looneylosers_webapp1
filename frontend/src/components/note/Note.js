import React, { Component, useState } from 'react'
import { Navbar } from '../navbar/Navbar'
import { useLocation } from 'react-router'
import { CloseButton } from '../Icons'





const NewComment = () => {

	const [content, setContent] = useState('')

	const handleSubmitContent = event => {
		setContent(event.target.value)
	};


	const SaveComment = event => {
		event.preventDefault();

		var path = window.location.pathname
		console.log(path.slice(6))
		var pk = path.slice(6)

		fetch("https://track1api.herokuapp.com/api/v1/comment/" + pk, {
			method: "POST",
			body: JSON.stringify({
				"content": content
			}),
			headers: {
				Authorization: "Token 9dc989e255976ae40ff010503891617a5bebe440",
				"Content-Type": "application/json",
			}

		})
		return (

			<form className="add-comment" onSubmit={SaveComment}>
				<input type="" className="new-comment" placeholder="post your comment here" />
				<input type="Submit" value="AddComment" />
			</form>

		);

	}

return null
}


export class Note extends Component {

	state = {
		note: [{
			"id": "9d255d4e-4f02-4eb9-a867-007784d0617b",
			"note_title": "--------",
			"content": "---------",
			"time_created": "2021-09-27T13:49:44.791306Z",
			"time_last_edited": "2021-09-27T13:49:44.791306Z",
			"is_public": false,
		}],
		comments: [{
			"content": "--",
			"user": {"name":"----"},
			"content": "----",
			"time_created": "2021-09-27T19:08:27.132554Z"
		}]
	}



	async componentDidMount() {
		var path = window.location.pathname
		console.log(path.slice(6))
		var pk = path.slice(6)
		const url = "https://track1api.herokuapp.com/api/v1/note/" + pk;
		const response = await fetch(url, {
			method: "GET",

			headers: {
				Authorization: "Token 9dc989e255976ae40ff010503891617a5bebe440",
				"Content-Type": "application/json",
			}
		});
		const data = await response.json();
		this.setState({ data: data });
        if(this.state.data["coments"] != undefined){
		this.setState({ comments: this.state.data["comments"] })}

		console.log(this.state.comments)
	}






	render() {
		var comments = this.state.comments
		console.log("-->", comments)
		return (
			<div>
				<Navbar />
				<div className="note-body-wrapper">
					<div className="note-menu">
						<CloseButton />
						{/* <p>Make {this.props.toggle}</p> */}
						<p>Delete</p>
						<p>Edit</p>
					</div>
					<div className="note-body">

						<p className="time-created">Time Created</p>
						<div className="note-title">
							Title
						</div>
						<div className="note-content">
							Content
						</div>

					</div>

					{/* comment section */}
					<div className="comment-wrapper">
						<h2 className="title">Comments</h2>
						{
							comments.map(function (comment, index) {
								return (
									<div className="comment-body">
										<img src="./" alt="" className="pfp" />
										<div className="the-comment">

											<p>{comment.content}</p>

											<span className="author">{comment.user.name}</span>
											<span className="like-count"><img src="./" alt="" className="likes" />1</span>
											<span className="comment-date">{new Intl.DateTimeFormat('en-GB', { dateStyle: 'short', timeStyle: 'short' }).format((Date.parse(comment.time_created)))}</span>
										</div>
									</div>)
							})
						}

						<NewComment />

					</div>
				</div>
			</div>
		);
	}
}

export default Note