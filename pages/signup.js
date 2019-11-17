import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import Router, { withRouter } from 'next/router';
import withLayout from '../components/Layout';
import MultiForm from '../components/MultiForm';
import colors from '../lib/colors'
import { employer } from '../lib/forms/employer'
import { employee } from '../lib/forms/employee'
import { createUser } from '../redux/actions'


const SignUp = (props) => {

  if (props.loggedIn) {
    Router.push('/app')
  }

  // if employee flow show different signup form
  if (props.router.query.type == 'employee') {
    return (
      <MultiForm initialState={{}}
                 form={employee}
                 successCallback={(user) => props.createUser(user, props.router.query.goTo, 'employee')}
                 disabled={props.loggedIn || props.isCreatingAccount}
                 title={'Get Started'}
                 headers={['Personal', 'Address', 'Account']}
      />
    )
  } else {
    return (
      <MultiForm initialState={{}}
                 form={employer}
                 successCallback={(user) => props.createUser(user, props.router.query.goTo, 'employer')}
                 disabled={props.loggedIn || props.isCreatingAccount}
                 title={'Get Started'}
                 headers={['Company', 'Address', 'Account']}
      />
    )
  }
}

const mapStateToProps = state => {
    return {
        isCreatingAccount: state.isCreatingAccount,
        loggedIn: state.loggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
          createUser,
        },
        dispatch
    );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withLayout(SignUp)))
