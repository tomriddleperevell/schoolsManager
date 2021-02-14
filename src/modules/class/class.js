import React from 'react';
import './class.css';

const daysOfWeek = ['ორშაბათი', 'სამშაბათი', 'ოთხშაბათი', 'ხუთშაბათი', 'პარასკევი'];


function SelectCourse(props) {
	const { courses, value, onChange } = props
	return <select value={value} onChange={ e => onChange(e.target.value) }>
			{courses.map( (course, id) =>  
				<option key={id} value={id}>{course}</option>
			)}
	</select>
}

function DaySchedule(props) {
	const { courses, data, day, onChange} = props;
	return <div className="schedule-item">
		<h2>{day}</h2>
		{data.map((courseid, i) => 
			<div key={i}>
				<SelectCourse 
					value={courseid}
					courses={courses}
					onChange={ newvalue => onChange(i, newvalue)}
					/>
					<br/>
			</div>
			)}
	</div>
}

function ClassSchedule(props) {
	const { schedule, courses, onChange} = props
	return <div className="schedule">
		{daysOfWeek.map( (day, dayid) => 
			<DaySchedule 
				key={day} 
				day={day} 
				data={schedule[dayid]} 
				courses={courses}
				onChange={(i, newvalue) => onChange(dayid, i, newvalue)}
				/>
			)}
	</div>
}


export class ClassPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isLoaded: false,
			classData: {},
			schedule: [],
		}
		this.getData = this.getData.bind(this);
		this.handleSheduleChange = this.handleSheduleChange.bind(this);
		this.submitShedule = this.submitShedule.bind(this);
	}

	getData(id, retry) {
		console.log(`/api/classes/class_${id}.json`)
		fetch(`/api/classes/class_${id}.json`)
			.then(res=>res.json())
			.then(classData => {
				this.setState({
					classData: classData,
					isLoaded: true,
					schedule: classData.schedule,
				});
			})
			.catch(err => {
				console.log(err)
				if(retry)
					this.getData(1, false); // because we have no backend
				else 
					alert("no internet connection")
			})
	}

	componentDidMount() {
		this.getData(this.props.id, true)
	}

	handleSheduleChange(day, i, val) {
		console.log(day, i, val);
		val = parseInt(val);
		this.setState((oldState) => {
			let updatedShedule = oldState.schedule;
			updatedShedule[day][i] = val;
			return {
				schedule: updatedShedule
			}
		})
	}

	submitShedule() {
		console.log(this.state.schedule)
		fetch('/api/updateShedule', {
				method: 'post',
				body: JSON.stringify(this.state.schedule)
			})
			.then(resp => resp.json())
			.then(resp => {
				if(resp.result == true)
					alert('შეინახა');
			})
			.catch(err => {
				alert('ბექი რომ მქონდეს შეინახავდა');
			})
	}

	render() {
		let courses = [
			"მათემატიკა",
			"ფიზიკა",
			"ბუნება",
			"ბიოლოგია",
			"ინგლისური",
			"რუსული",
			"ფრანგული",
			"გერმანული",
			"ქიმია"
		];
		const { isLoaded, classData } = this.state;
		if(!isLoaded) return null;
		console.log(classData)
		return <div className="content-container">
			<div className="content-nosidebar class-page">
				<a href={`#/school/${classData.school}?tab=classes`}>Back to school</a>
				<h1>სახელი: {classData.name}</h1>
				<p>დამრიგებელი: {classData.head}</p>
				<p>მოსწავლეების რაოდენობა: {classData.student_n}</p>
				<p>ცხრილი:</p>
				<ClassSchedule 
					schedule={classData.schedule} 
					courses={courses}
					onChange={this.handleSheduleChange}
					/>
				<button onClick={this.submitShedule}> 
					შენახვა!
				</button>
			</div>
	    </div> 
	}
}
