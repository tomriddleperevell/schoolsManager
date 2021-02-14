import React from 'react';
import './itemlist.css';

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

function ClassItem(props) {
	const { data } = props;
	return <a className="user-item pretty-item" href={`#/classes/${data.id}`}>
		<p>კლასი: {data.name}</p>
		<p>დამრიგებელი: {data.head}</p>
	</a>
}

function AnyItem({data, tab}) {
	if(tab === 'students') {
		return <StudentItem user={data} />;
	} else if(tab === 'teachers') {
		return <TeacherItem user={data} />;
	} else if(tab === 'classes') {
		return <ClassItem data={data} />
	}
}

export function ItemList(props) {
	const { itemDatas, tab } = props;
	return <div className="user-list">
		{itemDatas.map(itemData => <AnyItem key={itemData.id} tab={tab} data={itemData} /> )}
	</div>
}