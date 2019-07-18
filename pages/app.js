import React from 'react'
import { connect } from 'react-redux'
import colors from '../lib/colors'
import Link from 'next/link'
import withLayout from '../components/Layout';
import Input from '../components/Input';
import Button from '../components/Button';
import AccountSection from '../components/sections/Account'
import SearchSection from '../components/sections/Search'
import RequestsSection from '../components/sections/Requests'


const EmployerApp = (props) => (
	<div className="application">
		<div className="menu" >
			<div onClick={() => props.switchPage('search')} >
				<a className={props.currentSection == 'search' ? 'menu-item active' : 'menu-item'}>search</a>
			</div>
			<div onClick={() => props.switchPage('requests')} >
				<a className={props.currentSection == 'requests' ? 'menu-item active' : 'menu-item'}>requests</a>
			</div>
			<div onClick={() => props.switchPage('account')} >
				<a className={props.currentSection == 'account' ? 'menu-item active' : 'menu-item'}>account</a>
			</div>
		</div>
		{props.currentSection == 'search' && <SearchSection />}
		{props.currentSection == 'requests' && <RequestsSection user_type={props.user_type} user={props.user} />}
		{props.currentSection == 'account' && <AccountSection user={props.user} />}
		<style jsx>{`
		  .application { 
            height: 100vh;
            left:0;
            right:0;
		  	margin: 150px 65px;
		  	padding: 45px 60px;
	      	border-radius: 5px;
			background-color: ${colors.white};
			box-shadow: 0 2px 4px 0 ${colors.shadow};
		  }
		  .menu {
		  	display: flex;
		  	flex-direction: row;
		  }
		  .menu-item {
		  	text-decoration: none;
		  	margin-right: 20px;
		  	font-size: 18px;
		  	color: ${colors.darkGrey};
		  }
		  .active {
		  	color: ${colors.blue};
		  }

		`}</style>
	</div>
)

const EmployeeApp = (props) => (
	<div className="application">
		<div className="menu" >
			<div onClick={() => props.switchPage('requests')} >
				<a className={props.currentSection == 'requests' ? 'menu-item active' : 'menu-item'}>requests</a>
			</div>
			<div onClick={() => props.switchPage('account')} >
				<a className={props.currentSection == 'account' ? 'menu-item active' : 'menu-item'}>account</a>
			</div>
		</div>
		{props.currentSection == 'requests' && <RequestsSection user_type={props.user_type} user={props.user} />}
		{props.currentSection == 'account' && <AccountSection user={props.user} />}
		<style jsx>{`
		  .menu {
		  	display: flex;
		  	flex-direction: row;
		  }
		  .menu-item {
		  	text-decoration: none;
		  	margin-right: 20px;
		  	font-size: 18px;
		  	color: ${colors.darkGrey};
		  }
		  .active {
		  	color: ${colors.blue};
		  }

		`}</style>
	</div>
)



class App extends React.Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	page: ''
	  };
	}

	switchPage = (page) => {
		this.setState({ page })
	}

	render() {
		let currentSection = this.state.page
		if (!currentSection && this.props.user_type === 'employer') {
			currentSection = 'search'
		} else if (!currentSection && this.props.user_type === 'employee') {
			currentSection = 'requests'
		}

		if (this.props.user_type === 'employer' && this.props.loggedIn) {
		    return <EmployerApp currentSection={currentSection}
		    					switchPage={this.switchPage}
		    					user={this.props.user}
		    					user_type={this.props.user_type}
		    		/>
    	} else if (this.props.user_type === 'employee' && this.props.loggedIn) {
		    return <EmployeeApp currentSection={currentSection}
		    					switchPage={this.switchPage}
		    					user={this.props.user}
		    					user_type={this.props.user_type}
		    		/>
    	} else {
    		return <div />
    	}
	}
}

const mapStateToProps = state => {
    return {
        loggedIn: state.loggedIn,
        user: state.user,
        user_type: state.user_type,
    };
};

export default connect(
  mapStateToProps,
  null
)(withLayout(App))
