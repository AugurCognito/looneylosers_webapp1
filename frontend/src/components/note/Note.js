import React, { Component, useState, useCallback, useEffect } from 'react'
import { Navbar } from '../navbar/Navbar'
import { useLocation } from 'react-router'
import { CloseButton } from '../Icons'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Pencil, Delete } from '../Icons';
import { Link } from 'react-router-dom';
import './Note.css'

	



const Editor = (props) => {
	const [body, setBody] = useState("loading");
  const [cmInstance, setCmInstance] = useState(null);
  const getCmInstanceCallback = useCallback((editor) => {
    setCmInstance(editor);
  }, []);
  if (props.data != undefined){
  	var note_title = props.data.note_title
	  var note_body = props.data.content
	  var time_created = props.data.time_created
	  var time_edited = props.data.time_last_edited
	  console.log(">>",(note_body))
  }
  else{
	  var note_title = "...loading or not available"
	  var note_body = "...loading or not avilable"
	  var time_created = Date.now()
	  var time_edited = Date.now()
  }


  console.log(note_title)
  useEffect(() => {
    if (!cmInstance) return;
    cmInstance.doc.clearHistory();
  }, [cmInstance]);


	function deleteNote(){
		var path = window.location.pathname
		console.log(path.slice(6))
		var pk = path.slice(6)
		const url = "https://track1api.herokuapp.com/api/v1/note/" + pk;
		const response = fetch(url, {
			method: "DELETE",

			headers: {
				Authorization: `Token ${localStorage.getItem("key")}`,
				"Content-Type": "application/json",
			}
		});
	}

	return (
		<div className='existing-note'>
		<Link to='/'>	<CloseButton /></Link>
			<div className="note-body-header">
				<div className="note-title">
					
					<div className="note-title">{note_title}</div>
				</div>
				<div className="note-options">
					<div className="delete-note" onClick={deleteNote}><Delete /></div>
			
				</div>

			</div>
			 <SimpleMDE
      value={note_body}
      onChange={setBody}
      getCodemirrorInstance={getCmInstanceCallback}
    />
		</div>
	)
}




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
				Authorization: `Token ${localStorage.getItem("key")}`,
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
				Authorization: `Token ${localStorage.getItem("key")}`,
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
					<div className="note-body">
					
						<Editor data={this.state.data}/>
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