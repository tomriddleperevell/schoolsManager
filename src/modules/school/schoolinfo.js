import React from 'react';
import './schoolinfo.css';

export function SchoolInfo(props) {
	const school = props.value;
	return (
		<div className="school-info">   
			<a href="#/" className="back">
				<span className="material-icons">keyboard_backspace</span>Homepage
			</a>
			<img src={school.imgSrc} alt={school.name}/>
			<h1>{school.name}</h1>
			<p className="inseted">{school.description}</p>
			<div className="types inseted">
				{school.schoolTypes.map(type=>(
					<span key={type}><p>{type}</p></span>
				))}
			</div>
			<div className="details inseted">
				<p><span className="material-icons">public</span>{school.location}</p>
			</div>
		</div>
	);
}