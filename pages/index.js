import React, { Component } from "react";
import { connect } from 'react-redux'
import ReactTyped from 'react-typed'
import { bindActionCreators } from "redux";
import { Header } from '../components/Layout';
import colors from '../lib/colors'

import { logOut, switchPage } from '../redux/actions'

const employeeTypeStrings = [
  'a veteran?\n',
  'someone on food stamps?\n',
  'someone who\'s recently unemployed?\n',
  'an ex-felon?\n',
  'for a summer job?\n',
  'an empowerment zone resident?\n',
]

const fadeInterval = 3

class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showFirst: false,
      showSecond: false,
      loopIndex: 0,
      stringIndex: 0
    }
  }

  componentDidMount() {
    this.fadeText()
  }

  fadeText = () => {
    setInterval(() => {
      this.setState({
        showFirst: this.state.loopIndex == 0,
        showSecond: this.state.loopIndex == 2,
        loopIndex: (this.state.loopIndex + 1) % 4,
        stringIndex: (this.state.loopIndex % 2 == 0) ? (this.state.stringIndex+1) % employeeTypeStrings.length 
                                                        : this.state.stringIndex % employeeTypeStrings.length,
      });
    }, fadeInterval * 1000)
  }

  render() {
    return (
      <div>
        <Header {...this.props} />
          <div className={"background-rectangle"}/>

          <div className={"landing-content"}>
            <span>Are you hiring </span>
            <span style={{position: 'absolute'}} className={this.state.showFirst ? 'show' : 'hide'}>{employeeTypeStrings[this.state.stringIndex]}</span>
            <span className={this.state.showSecond ? 'show' : 'hide'}>{employeeTypeStrings[this.state.stringIndex]}</span>
            <br />
            <span>Calculate your federal tax credit…</span>
          </div>


        <style jsx global>{`
        .hide {
          transition: ${fadeInterval}s all ease;
          opacity: 0;
        }

        .show {
          transition: ${fadeInterval}s all ease;
          opacity: 1;
        }
        .modal {
          align-self: center;
          background-color: ${colors.white};
          margin: 100px 0;
          padding: 70px;
          border-radius: 20px;
          box-shadow: 0 2px 20px 0 rgba(8,69,61,0.05);
        }

        .page-content {
          display: flex;
          justify-content: center;
        }

        .background-rectangle {
          position: absolute;
          z-index: -1;
          margin-top: 25px;
          height: 800px;
          width: 120%;
          background-color: ${colors.grey};
          transform: rotate(-1deg);
        }

        .landing-content {
          margin: 105px 110px;

        }

        .landing-content span {
            font-size: 40px;
            line-height: 48px;
            color: ${colors.secondary};
          }

        body { 
          margin: 0px;
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -khtml-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          -o-user-select: none;
          user-select: none;
        }

        input:focus,
        select:focus,
        textarea:focus,
        button:focus {
            outline: none;
        }

        h2,h3,input{
          font-family: Avenir-Medium;
        }

        a,p {
          font-family: Avenir-Light;
        }

        h1, span {
          font-family: Avenir-Black;
          font-size: 18px;
        }
        `}</style>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
      loggedIn: state.loggedIn,
      activeSection: state.activeSection,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
      {
        logOut,
        switchPage,
      },
      dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Index)