import React from 'react';
import {SchoolList} from './schools';
import {SchoolFilters} from './filters';
import './home.css';


export function SearchBar(props) {
	return <div className="home-search">
		<input
			type="text" 
			placeholder="ჩაწერეთ საძიებო სიტყვა..."
			value={props.value} 
			onChange={(e)=>{props.onChange(e.target.value)}} />
	</div>
}


export class HomePage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isLoaded: false,
			schools: [],
			filters: {
				types: [],
				city: 'all',
			},
			searchStr: '',
		}
		this.handleFilterUpdate = this.handleFilterUpdate.bind(this);
		this.handleSearchStrUpdate = this.handleSearchStrUpdate.bind(this);
		this.searchSchools = this.searchSchools.bind(this);
	}

	searchSchools() {
		const {filters, searchStr} = this.state;

		console.log(filters)
		console.log(searchStr)
		// ეს უბრალოდ რომ სერჩის შედეგები სულ ერთიდაიგივე არ იყოს
		let kindOfHash = (filters.types.filter(x=>x.checked).length + filters.city.charCodeAt(0) + searchStr.length + 2) % 3 + 1;
		fetch(`/api/search/schools_${kindOfHash}.json`)
			.then(res=>res.json())
			.then(schools => {
				console.log(schools)
				this.setState({
					schools: schools,
					isLoaded: true
				});
			})
			.catch(err => {
				console.log(err)
				alert("no internet connection")
			})
	}

	componentDidMount() {
		this.searchSchools()
	}

	handleFilterUpdate(filters) {
		this.setState({filters: filters}, ()=>{this.searchSchools()})
	}

	handleSearchStrUpdate(str) {
		this.setState({searchStr: str}, ()=>{this.searchSchools()})
	}



	render() {
		const { isLoaded, schools } = this.state;
		if(!isLoaded)return null
		return <div className="content-container">
		    <div className="content">
		    	<div className="content-header">
		    		<h1>School Management System</h1>
		    		<div className="searh-container">
		    			<SearchBar value={this.state.searchStr} onChange={this.handleSearchStrUpdate} />
		    		</div>
		    	</div>
		    	<div className="content-left">
		    		<SchoolFilters onUpdate={this.handleFilterUpdate}/>
		    	</div>
		    	<div className="content-right">
		    		<SchoolList schoolList={schools}/>
		    	</div>
		    </div>
	    </div> 
	}
}