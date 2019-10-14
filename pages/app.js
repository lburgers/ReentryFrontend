import React, { Component } from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import withLayout from '../components/Layout';
import Router from 'next/router';

import Info from '../components/sections/info'
import Candidates from '../components/sections/candidates'
import Invite from '../components/sections/invite'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    if (!this.props.loggedIn) {
      Router.push('/login')
    }
  }

  render() {
    if (this.props.loggedIn && this.props.activeSection == 'info') {
      return <Info />
    } else if (this.props.loggedIn && this.props.activeSection == 'candidates') {
      return <Candidates />
    } else if (this.props.loggedIn && this.props.activeSection == 'invite') {
      return <Invite />
    } else {
      return <div />
    }
  }
}


const mapStateToProps = state => {
    return {
      activeSection: state.activeSection,
      loggedIn: state.loggedIn,
    };
};

export default connect(
  mapStateToProps,
  null
)(withLayout(App))
