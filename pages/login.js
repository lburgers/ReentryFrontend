import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import Router, { withRouter } from 'next/router';
import Link from 'next/link';
import withLayout from '../components/Layout';
import MultiForm from '../components/MultiForm';
import Button from '../components/Button';
import colors from '../lib/colors'
import login from '../lib/forms/login'

import { loginUser } from '../redux/actions'

// TODO: add incorrect information handling
// TODO: add success handling

const signUpRoute = (props) => {
  const goTo = props.router.query.goTo
  if (!!goTo) {
    return '/signup?goTo=' + goTo
  }
  return '/signup'
}

const Login = (props) => (
	<div className="container">
		<div className="box">
			<MultiForm forms={login}
                 onSubmit={(creds) => props.loginUser(creds, props.router.query.goTo)}
                 loading={props.isLoggingIn}
      />
      <span>or</span>
      <div className="sign-up-button">
        <Link href={signUpRoute(props)}>
          <Button primary={true}
                  title={'Sign up'}
          />
        </Link>
      </div>
		</div>
    <style jsx>{`
      .container { 
        display: flex;
        justify-content: center;
      	padding: 75px 0px 75px 0px;
      }
      .box {
      	width: 605px;
      	padding: 75px 0px 75px 0px;
      	border-radius: 5px;
    		background: ${colors.white};
    		box-shadow: 0 0 5px 1px ${colors.shadow};
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .sign-up-button {
        margin-top: 10px;
        width: 30vw;
        height: 25px;
      }
    `}</style>
	</div>
);

const mapStateToProps = state => {
    return {
        isLoggingIn: state.isLoggingIn,
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
