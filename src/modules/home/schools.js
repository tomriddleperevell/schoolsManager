import React from 'react';
import './schools.css';

export function SchoolItem(props) {
	const school = props.value;
	return (
		<a className="school-item pretty-item" href={`#/school/${school.id}`}>   
			<img src={school.imgSrc} alt={school.name}/>
			<div className="main">
				<div className="left">
					<h3>{school.name}</h3>
					<div className="types">
						{school.schoolTypes.map(type=>(
							<span key={type}><p>{type}</p></span>
						))}
					</div>
				</div>
				<div className="right">
					<div className="details">
						<p>{school.location}</p>
					</div>
				</div>
			</div>
		</a>
	);
}

export function SchoolList(props) {
	return <div className="school-list">
		{props.schoolList.map(school =>
			<SchoolItem key={school.name} value={school} />	
		)}
    </div>; 
}