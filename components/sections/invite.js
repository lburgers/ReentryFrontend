import React, { Component } from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import MultiForm from '../MultiForm';

import { createRequest } from '../../redux/actions'
import { request } from '../../lib/forms/request'


class Invite extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {

    return (
      <MultiForm initialState={{}}
                 form={request}
                 successCallback={this.props.createRequest}
                 disabled={this.props.isCreatingRequest}
                 title={'Invite Candidate'}
                 headers={['Job', 'Dates', 'Contact']}
      />

      )
  }
}


const mapStateToProps = state => {
    return {
        isCreatingRequest: state.isCreatingRequest,
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
          createRequest,
        },
        dispatch
    );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Invite)
