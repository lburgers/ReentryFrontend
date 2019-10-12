import React, { Component } from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import Button from '../Button';
import colors from '../../lib/colors'

const ProgressBar = (props) => {
  const progressWidth = (props.stage+1) * 235
  return (
          <div style={{display: 'flex'}}>
            <div className="frontbar" />
            <div className="backbar" />
            <style jsx>{`
              .backbar {
                background-color: ${colors.grey};
                width: 705px;
                border-radius: 7px;
              }
              .frontbar {
                position: absolute;
                background-color: ${colors.primary};
                width: ${progressWidth}px;
                height: 25px;
                border-radius: 7px;
              }
          `}</style>
          </div>

  )
}
const Candidate = (request) => {
  const formOne_stage = 0
  const formTwo_stage = 2

  return  (
      <div className="candidate-container">
        <h1 className="candidate-title">{request.employee_name}</h1>
        <h2 className="candidate-subtitle">{formOne_stage == 2 && formTwo_stage == 2 ? 'Completed' : 'In Progress'}</h2>

        <div className="table-row">
          <div className="spacer" />
          <div className="table-header">Created</div>
          <div className="table-header">Accepted</div>
          <div className="table-header">Finished</div>
          <div className="spacer" />
        </div>

        <div className="table-row">
          <div className="form-title">Form 1</div>
          <ProgressBar stage={formOne_stage}/>
          <Button title="Review" width={105} height={25} fontSize={12}/>
        </div>
        <div className="table-row">
          <div className="form-title">Form 2</div>
          <ProgressBar stage={formTwo_stage}/>
          <Button title="Sign" width={105} height={25} fontSize={12}/>
        </div>

        <style jsx>{`
          .candidate-container { 
            padding-bottom: 52px;
          }
          .candidate-title {
            color: ${colors.secondary};
            font-family: Avenir-Heavy;
            font-size: 24px;
            margin: 0;
          }
          .candidate-subtitle {
            color: ${colors.primary};
            font-family: Avenir-Heavy;
            font-size: 18px;
            margin: 0;
          }
          .table-row {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin-bottom: 15px;
          }
          .spacer {
            width: 130px;
          }
          .table-header {
            width: 235px;
            color: ${colors.secondary};
            font-family: Avenir-Heavy;
            font-size: 12px;
            text-align: center;
          }
          .form-title {
            color: ${colors.primary};
            font-family: Avenir-Heavy;
            font-size: 16px;
          }
        `}</style>
    </div>
    )
}


class Candidates extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div className="candidates-container">
        <h1 className="candidates-title">Candidates</h1>
        <Candidate employee_name="Lukas Burger" />
        <Candidate employee_name="John Smith" />

        <style jsx>{`
          .candidates-container { 
          }
          .candidates-title {
            color: ${colors.secondary};
            font-family: Avenir-Black;
            font-size: 24px;
            padding-bottom: 30px;
          }

        `}</style>
    </div>

      )
  }
}


const mapStateToProps = state => {
    return {
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
)(Candidates)
