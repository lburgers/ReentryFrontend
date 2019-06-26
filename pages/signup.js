import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import withLayout from '../components/Layout';
import MultiForm from '../components/MultiForm';
import colors from '../lib/colors'
import employerSignup from '../lib/forms/employerSignup'
import { createUser } from '../redux/actions'


const SignUp = (props) => (
	<div className="container">
		<div className="box">
			<MultiForm forms={employerSignup}
                 onSubmit={(user) => props.createUser(user)}
                 loading={props.isCreatingAccount}
      />
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
