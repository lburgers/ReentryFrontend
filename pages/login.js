import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import withLayout from '../components/Layout';
import MultiForm from '../components/MultiForm';
import colors from '../lib/colors'
import login from '../lib/forms/login'

import { loginUser } from '../redux/actions'

// TODO: add incorrect information handling
// TODO: add success handling

const Login = (props) => (
	<div className="container">
		<div className="box">
			<MultiForm forms={login}
                 onSubmit={props.loginUser}
                 loading={props.isLoggingIn}
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
)(withLayout(Login))
