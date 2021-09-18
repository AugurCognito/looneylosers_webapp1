import React from 'react'

export const CardPreview = () => {
	return (
		<div clasName="public card">
			<div className="card-header">
				<div className="card-title-wrapper">
				<h1 className="card-title">Title</h1>
				<h3 className="card-author">Author</h3>
			</div>
			<div className="card-description">
				Description
			</div>
			<div className="card-footer">
				<p className="date-created">Date Created : Date</p>
				<span className="comment-count"><img src="./" alt="Img" />Number</span>
			</div>
			</div>
		</div>
	);
}
