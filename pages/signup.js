import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import withLayout from '../components/Layout';
import MultiForm from '../components/MultiForm';
import colors from '../lib/colors'
import userSignup from '../lib/forms/userSignup'
import { createUser } from '../redux/actions'


const SignUp = (props) => (
	<div className="container">
		<div className="box">
			{!props.loggedIn && <MultiForm forms={userSignup}
                 onSubmit={(user) => props.createUser(user)}
                 disabled={props.loggedIn || props.isCreatingAccount}
      />}
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
        justify-content: center;
        align-items: center;
      }
    `}</style>
	</div>
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
)(withLayout(SignUp))
