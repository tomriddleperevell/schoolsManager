import React from 'react';
import './userslist.css';

function StudentItem(props) {
	const { user } = props;
	return <a className="user-item pretty-item" href={`#/student/${user.id}`}>
		<p>სახელი: {user.name}</p>
		<p>კლასი: {user.class}</p>
	</a>
}

function TeacherItem(props) {
	const { user } = props;
	return <a className="user-item pretty-item" href={`#/teacher/${user.id}`}>
		<p>სახელი: {user.name}</p>
		<p>საგნები: {user.description}</p>
	</a>	
}

export function UsersList(props) {
	const { users, tab } = props;
	return <div className="user-list">
		{users.map(user => (tab === 'students' ? 
				<StudentItem key={user.id} user={user} /> 
				: 
				<TeacherItem key={user.id} user={user} /> 
				))}
	</div>
}