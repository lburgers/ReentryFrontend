import React, { Component } from 'react'
import Table from '../Table';
import Input from '../Input';
import db from '../../services/db'

class SearchSection extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	query: '',
	  	users: []
	  };
	}

	search = async (query) => {
		this.setState({ query })
		const results = await db.employee.search(query)
		const users = results.map(user => {
			const name = `${user.first_name} ${user.last_name}`
			const location = `${user.city}, ${user.state}`
			const potential_refund = '$9,000' // TODO: calculate myself
			return [name, location, potential_refund, user._id]
		})
		this.setState({ users })
	}

	render() {
		return (
		<div>
			<div className='search-bar'>
				<Input placeholder={'Search by name, city, state, or zipcode'}
					   value={this.state.query}
					   onChange={this.search}
				/>
			</div>
			<Table headers={['Name', 'City', 'Potential Refund']}
				   entries={this.state.users}
				   buttonText="Contact"
				   buttonLink={'/jobseeker'}
			/>
			<style jsx>{`
			  .search-bar {
			  	margin-top: 25px;
			  }
		  `}</style>
		</div>
		)
	}
}

export default SearchSection