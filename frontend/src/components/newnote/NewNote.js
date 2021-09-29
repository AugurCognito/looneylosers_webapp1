import React, { useState, useEffect, useCallback } from 'react'
import { CloseButton } from '../Icons';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import './NewNote.css'
import { Link } from 'react-router-dom';
import {Page, Navbar, NavbarBackLink, List, ListItem, Toggle} from 'tailwind-mobile/react';




export const NewNote = () => {
	function saveNote(){
		console.log(body)
		console.log(title)
		console.log(checked1)
		fetch('https://track1api.herokuapp.com/api/v1/notes/',{
		  method: "POST",
		  body: JSON.stringify({
			"note_title": title,
			"content": body,
			"is_public": checked1
			}
		  ),
		  headers: {Authorization: `Token ${localStorage.getItem("key")}`,
			  "content-type": "application/json",
					}
		})
	}
	const [checked1, setChecked1] = useState(false);
	const [title, setTitle] = useState('')
	const [body, setBody] = useState("hello");
	const [cmInstance, setCmInstance] = useState(null);
	const getCmInstanceCallback = useCallback((editor) => {
		setCmInstance(editor);
	}, []);

	useEffect(() => {
		if (!cmInstance) return;
		cmInstance.doc.clearHistory();
	}, [cmInstance]);

	const changeTitle = event => {
    setTitle(event.target.value)
  };

	function ToggleSwitch() {
  

		return (
			<ListItem
					 
			after={
				<Toggle
					className="-my-1"
					checked={checked1}
					colors={{ bg: 'bg-red-500' }}
					onChange={() => setChecked1(!checked1)}
				/>
			}
		/>
					
		 
		);
	}

	return (
		<div className="editor-wrapper">
			<Link to='/'>	<CloseButton /></Link>
			<div className="note-body-header">
				<div className="note-title">
					<input type="text" className="note-title" placeholder="Title" onChange={changeTitle}value={title}/>
				</div>
				<div className="note-options">
					<p>Make public?</p>
					<ToggleSwitch />
					<input type="Submit" value="Save" className="save-note" onClick={saveNote}/>
				</div>

			</div>

			<SimpleMDE
				value={ body}
				onChange={setBody}
				getCodemirrorInstance={getCmInstanceCallback}
			/>

		</div >


	)
}
