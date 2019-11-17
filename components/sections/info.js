import React, { Component } from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import MultiForm from '../MultiForm';

import { updateUser } from '../../redux/actions'
import { employer } from '../../lib/forms/employer'


class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {

    return (
      <MultiForm initialState={this.props.user}
                 form={employer}
                 successCallback={this.props.updateUser}
                 disabled={this.props.isUpdatingAccount}
                 title={'Your Info'}
                 headers={['Company', 'Address', 'Account']}
      />

      )
  }
}


const mapStateToProps = state => {
    return {
      user: state.user,
      isUpdatingAccount: state.isUpdatingAccount,
      errorUpdatingAccount: state.errorUpdatingAccount,
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
          updateUser
        },
        dispatch
    );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Info)
