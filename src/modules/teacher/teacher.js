import React from 'react';
import './teacher.css';



export class TeacherPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isLoaded: false,
			teacher: {},
		}
	}

	componentDidMount() {
		fetch(`/api/users/teacher_${this.props.id}.json`)
			.then(res=>res.json())
			.then(teacher => {
				this.setState({
					teacher: teacher,
					isLoaded: true
				});
			})
			.catch(err => {
				console.log(err)
				alert("no internet connection")
			})
	}

	render() {
		const { isLoaded, teacher } = this.state;
		if(!isLoaded) return null;
		console.log(teacher)
		return <div className="content-container">
			<div className="content-nosidebar teacher-page">
				<a href={`#/school/${teacher.school}`}>Back to school</a>
				<img src={teacher.imgSrc} alt="teacher image" />
				<h3>სახელი: {teacher.name}</h3>
				<p>დაბადების დღე: {teacher.birthday}</p>
				<p>პირადი ნომერი: {teacher.pn}</p>
				<p>გავკეთილები რომლებსაც ასწავლის:</p>
				<ul>
					{teacher.classes.map(course => <li key={course}>{course}</li>)}
				</ul>
			</div>
	    </div> 
	}
}
