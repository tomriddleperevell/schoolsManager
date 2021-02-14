import React from 'react';
import './filters.css';

function TypeFilter(props) {
	return <div className="checkboxes">
		{props.types.map(type=> 
			<div key={type.name} className="checkbox" onClick={()=>props.onChange(type.name)}>
				<input name={type.name}
					type="checkbox"
					checked={type.checked}
					readOnly={true}
					/>
				<label>{type.name}</label>
			</div>
		)}
	</div>
}

function LocationFilter(props) {
	return <div className="locationFilter">
		<h1> Location </h1>
		{props.cities.map(city=> 
			<div key={city} className="radio" onClick={()=>props.onChange(city)}>
				<input name={city}
					type="radio"
					checked={city === props.value}
					readOnly={true}
					/>
				<label>{city}</label>
			</div>
		)}
	</div>
}


export class SchoolFilters extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			error: null,
			isLoaded: false,
			types: [],
			selectedCity: '',
			cities: []
		}
		this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
		this.citySelected =  this.citySelected.bind(this);
	}

	componentDidMount() {
		let citiesPromise = fetch('/api/cities.json').then(response => response.json())
		let schoolTypesPromise = fetch('/api/schooltypes.json').then(response => response.json())
		Promise.all([citiesPromise, schoolTypesPromise])
			.then(([cities, types]) => {
				console.log(cities, types)
				this.setState({
					cities: cities,
					types: types.map(type=>({name:type, checked: false})),
					selectedCity: cities[0],
					isLoaded: true
				});
			})
			.catch(_ => {
				alert("no internet connection")
			})
	}

	updateResults() {
		console.log(this.state.types, this.state.selectedCity)
		this.props.onUpdate({
			types: this.state.types,
			city: this.state.selectedCity,
		})
	}

	handleCheckboxChange(name) {
		this.setState(oldState => ({
			types: oldState.types.map(type=>{
				if(type.name==name) {
					type.checked = !type.checked;
				}
				return type;
			})
		}));
		this.updateResults()
	}

	citySelected(city) {
		this.setState({selectedCity: city});
		this.updateResults();
	}

	render() {
		const { isLoaded, types,  selectedCity, cities} = this.state;
		if(!isLoaded) return null;
		return <div className="filters-container">
			<TypeFilter types={types} onChange={this.handleCheckboxChange}/>
			<LocationFilter cities={cities} onChange={this.citySelected} value={selectedCity}/>
		</div>;
	}
}