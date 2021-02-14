import React from 'react';
import './student.css';



export class StudentPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isLoaded: false,
			student: {},
		}
	}

	componentDidMount() {
		fetch(`/api/users/student_${this.props.id}.json`)
			.then(res=>res.json())
			.then(student => {
				this.setState({
					student: student,
					isLoaded: true
				});
			})
			.catch(err => {
				console.log(err)
				alert("no internet connection")
			})
	}

	render() {
		const { isLoaded, student } = this.state;
		if(!isLoaded) return null;
		console.log(student)
		return <div className="content-container">
			<div className="content-nosidebar student-page">
				<a href={`#/school/${student.school}?tab=students`}>Back to school</a>
				<img src={student.imgSrc} alt="student image" />
				<h3>სახელი: {student.name}</h3>
				<p>GPA: {student.GPA}</p>
				<p>დაბადების დღე: {student.birthday}</p>
				<p>კლასი: {student.class}</p>
				<p>მასწავლებლის კომენატრები:</p>
				<ul>
					{student.comments.map(comment => <li key={comment}>{comment}</li>)}
				</ul>
			</div>
	    </div> 
	}
}
