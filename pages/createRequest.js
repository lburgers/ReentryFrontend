import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import Router, { withRouter } from 'next/router';
import withLayout from '../components/Layout';
import MultiForm from '../components/MultiForm';
import colors from '../lib/colors'
import requestForm from '../lib/forms/createRequest'
import { createRequest } from '../redux/actions'

console.log(requestForm)

const CreateRequest = (props) => (
	<div className="container">
		<div className="box">
      <MultiForm forms={requestForm}
                 onSubmit={(data) => props.createRequest(data, props.router.query.id)}
                 disabled={props.isCreatingRequest}
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
)(withRouter(withLayout(CreateRequest)))
