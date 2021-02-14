import React from 'react';
import {SchoolInfo} from './schoolinfo';
import {TabSwitcher} from './tabswitcher';
import {UsersList} from './userslist'
import './schoolpage.css';

export class SchoolPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoaded: false,
			schoolInfo: {},
			users: [],
			tab: props.tab || 'teachers'
		};
		this.handleTabChange = this.handleTabChange.bind(this);
	}

	fetchSchool(schoolid, retry) {
		fetch(`/api/schools/${schoolid}.json`)
			.then(res=>res.json())
			.then(school => {
				console.log(school)
				this.setState({
					schoolInfo: school,
					isLoaded: true
				});
			})
			.catch(err => {
				console.log(err)
				if(retry)
					this.fetchSchool("tsu", false)
			})
	}

	componentDidMount() {
		this.fetchSchool(this.props.schoolid, true)
		this.fetchTabContent()
	}

	fetchTabContent() {
		const { tab } = this.state; 
		if(tab === 'students') {
			fetch('/api/users/students.json')
				.then(r=>r.json())
				.then(users=>this.setState({users: users}))
		} else if( tab === 'teachers' ){
			fetch('/api/users/teachers.json')
				.then(r=>r.json())
				.then(users=>this.setState({users: users}))
		}
	}

	handleTabChange(newTab) {
		this.setState({tab: newTab}, ()=>{this.fetchTabContent()});
		let oldLink = location.hash;
		let linkParts = oldLink.split('?');
		if(linkParts.length < 2) linkParts.push('');
		linkParts[1] = `?tab=${newTab}`;
		let newLink = linkParts.join('');
		location.hash = newLink;
		// history.pushState({}, '', newLink); 
		// console.log(oldLink.split('?'));
	}

	render() {
		const { isLoaded, schoolInfo } = this.state;
		if(!isLoaded) return null;
		let tabContent;
		if(this.state.tab === 'students' || this.state.tab === 'teachers') {
			tabContent = <UsersList tab={this.state.tab} users={this.state.users} />
		}

		return <div className="content-container">
		    <div className="content">
		    	<div className="content-left">
		    		<SchoolInfo value={schoolInfo} />
		    	</div>
		    	<div className="content-right">
		    		<TabSwitcher value={this.state.tab} onTabChange={this.handleTabChange} />
		    		{tabContent}
		    	</div>
		    </div>
	    </div> 
	}
}