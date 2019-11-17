import React, { Component } from 'react'
import Table from '../Table';
import db from '../../services/db'


const description_from_stage = {
	'-1': 'Waiting for applicant to make account',
	'0': 'Waiting for applicant to accept request',
	'1': 'Awaiting additional information',
	'2': 'Awaiting signatures',
	'3': 'Form is completed and should be submitted',
}

const status_from_stage = {
	'-1': 'Pending',
	'0': 'Pending',
	'1': 'Half-complete',
	'2': 'Half-complete',
	'3': 'Completed',
}

class RequestsSection extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	requests: []
	  };
	}

	componentWillMount() {
		const other_user_type = this.props.user_type == 'employee' ? 'employer' : 'employee'

		db.request.getAll({user_type: this.props.user_type, id: this.props.user._id})
			.then( (requests) => {
				requests = requests.map(request => {
					return [
						 request[other_user_type + '_name'],
						 description_from_stage[request.stage],
						 status_from_stage[request.stage],
						 request._id,
						]
				})
				this.setState({ requests })
			}).catch(console.log)
	}

	render() {
		return (
		<div>
			<Table headers={['Form name', 'Description', 'Status']}
				   entries={this.state.requests}
				   buttonText="Open"
				   buttonLink={'/request'}
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

export default RequestsSection