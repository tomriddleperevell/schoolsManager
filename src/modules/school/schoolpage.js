import React from 'react';
import {SchoolInfo} from './schoolinfo';
import {TabSwitcher} from './tabswitcher';
import {ItemList} from './itemlist'
import './schoolpage.css';

export class SchoolPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoaded: false,
			schoolInfo: {},
			data: [],
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
				.then(users=>this.setState({data: users}))
		} else if( tab === 'teachers' ){
			fetch('/api/users/teachers.json')
				.then(r=>r.json())
				.then(users=>this.setState({data: users}))
		} else if( tab === 'classes' ) {
			fetch('/api/classes/classes.json')
				.then(r=>r.json())
				.then(classes=>this.setState({data: classes}))
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
		
		return <div className="content-container">
		    <div className="content">
		    	<div className="content-left">
		    		<SchoolInfo value={schoolInfo} />
		    	</div>
		    	<div className="content-right">
		    		<TabSwitcher value={this.state.tab} onTabChange={this.handleTabChange} />
		    		<ItemList tab={this.state.tab} itemDatas={this.state.data} />
		    	</div>
		    </div>
	    </div> 
	}
}