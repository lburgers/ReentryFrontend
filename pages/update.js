import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import withLayout from '../components/Layout';
import MultiForm from '../components/MultiForm';
import colors from '../lib/colors'
// import { updateUser } from '../redux/actions'

// TODO: finish this

const Update = (props) => (
	<div className="container">
		<div className="box">
			// {!props.loggedIn && <MultiForm forms={userSignup}
                 onSubmit={(user) => console.log(user)}
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
        loggedIn: state.loggedIn,
        user_type: state.user_type
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
        },
        dispatch
    );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withLayout(Update))
