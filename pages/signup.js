import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import Router, { withRouter } from 'next/router';
import withLayout from '../components/Layout';
import MultiForm from '../components/MultiForm';
import colors from '../lib/colors'
import { employer } from '../lib/forms/employer'
import { createUser } from '../redux/actions'

// TODO: can't get here if logged out

const SignUp = (props) => (
  <MultiForm initialState={{}}
             form={employer}
             successCallback={(user) => props.createUser(user, props.router.query.goTo, 'employer')}
             disabled={props.loggedIn || props.isCreatingAccount}
             title={'Get Started'}
             headers={['Company', 'Address', 'Account']}
  />
);

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
