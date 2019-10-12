import React, { Component } from "react";
import Link from 'next/link'
import { connect } from 'react-redux'
import withLayout from '../components/Layout';
import Input from '../components/Input';
import colors from '../lib/colors'


class Index extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    
    return <Input/>
  };
}

const mapStateToProps = state => {
    return {
        loggedIn: state.loggedIn,
        user_type: state.user_type,
    };
};


export default connect(
  mapStateToProps,
  null,
)(withLayout(Index))