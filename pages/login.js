import React, { Component } from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import Router, { withRouter } from 'next/router';
import withLayout from '../components/Layout';
import Form from '../components/Form';
import Button from '../components/Button';
import colors from '../lib/colors'

import { loginUser } from '../redux/actions'

const loginForm = [
    {
      name: 'username',
      title: 'Email',
      placeholder: '',
      validator: (email) => (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)),
      req: true,
    },
    {
      name: 'password',
      title: 'Password',
      placeholder: '',
      validator: (password) => password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/) !== null,
      req: true,
    },
]

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formState: {}
    }
  }

  componentDidMount() {
    if (this.props.loggedIn) {
      Router.push(`/app`)
    }
  }

  submit() {
    const formState = this.state.formState
    console.log(formState)

    let error = false
    for (var i = 0; i < loginForm.length; i++) {
      const fieldName = loginForm[i].name

      if ((formState.values || {[fieldName] : ''})[fieldName].length == 0 ||
            formState.errors[fieldName] == true) {

        error = true

      }
    }
    if (!error) {
      this.props.loginUser(formState.values)
    }
  }


  render() {
    return (
      <div className="form-container">
        <h1 className="form-title">Login</h1>
        <Form fields={loginForm}
              onChange={(formState) => this.setState({ formState })}
        />
        <div className="form-button">
          <Button title="Submit"
                  onClick={() => this.submit()}
                  disabled={this.props.isLoggingIn}
          />
        </div>

        <style jsx>{`
          .form-container { 
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            background-color: ${colors.white};
            padding: 70px;
            border-radius: 20px;
          }
          .form-title {
            color: ${colors.secondary};
            font-family: Avenir-Black;
            font-size: 24px;
            margin: 0;
          }
          .form-button {
            margin-top: 45px;
          }

        `}</style>
    </div>

      )
  }
}


const mapStateToProps = state => {
    return {
        isLoggingIn: state.isLoggingIn,
        loggedIn: state.loggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
          loginUser,
        },
        dispatch
    );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withLayout(Login)))
