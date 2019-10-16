import React, { Component } from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import Link from 'next/link'
import { Header } from '../components/Layout';
import Button from '../components/Button';
import Input from '../components/Input';
import colors from '../lib/colors'

import { logOut, switchPage } from '../redux/actions'

// content constants
const fadeInterval = 2
const employeeTypeStrings = [
  'a veteran?\n',
  'someone on food stamps?\n',
  'someone who\'s unemployed?\n',
  'an ex-felon?\n',
  'for a summer job?\n',
  'an empowerment zone resident?\n',
]


const conversions = {
  'ex-felon': {rate: 0.4, max: 2400},
  'veteran': {rate: 0.4, max: 4800},
  'summer employee': {rate: 0.25, max: 750},
  'food stamp recipient': {rate: 0.4, max: 2400},
  'long-term unemployed': {rate: 0.4, max: 2400},
  'empowerment zone resident': {rate: 0.4, max: 2400},
}


const TypeChooser = (props) => {
  const types = Object.keys(conversions)
  const renderBlock = (key) => {
     var style = {}
     if (props.selected == types[key]) {
      style.backgroundColor = colors.red
      style.color = colors.white
      if (key == 0) style.borderRadius = '20px 0 0 0'
      if (key == 1) style.borderRadius = '0 20px 0 0'
      if (key == 4) style.borderRadius = '0 0 0 20px'
      if (key == 5) style.borderRadius = '0 0 20px 0'
     }

     return (
      <div style={style} className="type-block"
           onClick={() => props.onChange(types[key])}
      >
        {types[key]}
        <style jsx>{`
        .type-block {
          display: flex;
          flex: 1;
          flex-direction: column;
          justify-content: center;
          height: 100%;
          font-family: Avenir-Black;
          font-size: 18px;
          color: ${colors.red};
          text-align: center;
        }
          `}</style>
      </div>
    )
  }

  return (
    <div className="type-chooser">
      <div className="type-row">
        {renderBlock(0)}
        {renderBlock(1)}
      </div>
      <div className="type-row">
        {renderBlock(2)}
        {renderBlock(3)}
      </div>
      <div className="type-row">
        {renderBlock(4)}
        {renderBlock(5)}
      </div>
    <style jsx>{`
        .type-chooser {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          margin-right: 35px;
          width: 472px;
          height: 283px;
          border-radius: 20px;
          background-color: rgba(183, 60, 125, 0.1);
          opacity: 1;
        }
        .type-row {
          display: flex;
          flex: 1;
          flex-direction: row;
          justify-content: space-around;
          align-items: center;
        }
    `}</style>
    </div>
  )
}


class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      calcValue: 'ex-felon',
      hours: '',
      wage: '',

      showFirst: false,
      showSecond: false,
      loopIndex: 0,
      stringIndex: 0
    }
  }

  componentDidMount() {
    this.fadeText()
  }

  // handle calc normalization and validation
  updateCalcState = (field) => (event) => {
    var key = event.keyCode || event.charCode;
    var updateValue = String(this.state[field])
    if (key == 8 || key == 46) {
      updateValue = updateValue.slice(0,-1)
    } else {
      updateValue += event.key
    }
    updateValue = updateValue.replace(/[^0-9]/g,'');
    this.setState({[field]: parseFloat(updateValue)})
  }

  // fade through various employer types
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

    // estimate potential credit claim
    const employeeType = this.state.calcValue
    const yearlySalary = this.state.hours*this.state.wage*52
    let calculatedResult = 1000
    if (typeof(yearlySalary) == 'number') {
           calculatedResult = Math.min(yearlySalary*conversions[employeeType].rate, conversions[employeeType].max)
    }

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

            <div className="calc-container">
                <TypeChooser selected={this.state.calcValue} onChange={(type) => this.setState({calcValue: type})}/>
                <div>
                  <div className="calc">
                    <div className="calc-title">{this.state.calcValue}</div>
                   
                    <div>
                      <div className="calc-sub-title">hours worked / week</div>
                      <div style={{height: '62px'}}>
                        <Input backgroundColor={'rgba(255,255,255,0.1)'}
                               placeholderColor={'rgba(255,255,255,0.8)'}
                               placeholder={"45hrs"}
                               primary={colors.white}
                               value={this.state.hours ? `${this.state.hours}/hrs` : ''}
                               onKeyPress={this.updateCalcState('hours')}/>
                      </div>
                    </div>

                    <div>
                      <div className="calc-sub-title">hourly wage</div>
                      <div style={{height: '62px'}}>
                        <Input backgroundColor={'rgba(255,255,255,0.1)'}
                               placeholderColor={'rgba(255,255,255,0.8)'}
                               placeholder={"$20/hr"}
                               primary={colors.white}
                               value={this.state.wage ? `\$${this.state.wage}/hr` : ''}
                               onKeyPress={this.updateCalcState('wage')}/>
                      </div>
                    </div>

                    <div>
                      <div className="calc-result">${calculatedResult}/year credit</div>
                      <div style={{textAlign: 'center'}} className="calc-sub-title">estimated</div>
                    </div>
                  </div>
                  <Link href={'/signup'}>
                    <Button height={83} width={440} title={"Get Started"}/>
                  </Link>
                </div>
            </div>
            <span>How to claim</span>
            <div className={"claim-steps"}>
              <div>
                <h2>Enter your information</h2>
                <img src={"/static/enter_info.png"} />
              </div>
              <div>
                <h2>Invite applicants</h2>
                <img src={"/static/invite_candidates.png"} />
              </div>
              <div>
                <h2>Sign, send, and claim your credit</h2>
                <img src={"/static/claim_credit.png"} />
              </div>
            </div>
          </div>


        <style jsx global>{`

        .claim-steps {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
        .calc-container {
          margin: 40px 0;
          display: flex;
          flex-direction: row;
          justify-content: center;
        }
        .calc {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-bottom: 20px;
          height: 450px;
          width: 392px;
          border-radius: 20px;
          background-color: ${colors.red};
          padding: 18px 24px;
          color: ${colors.white};
        }
        .calc-title {
          font-family: Avenir-Black;
          font-size: 40px;
          color: ${colors.white};
        }
        .calc-sub-title {
          padding-top: 5px;
          padding-bottom: 10px;
          font-family: Avenir-Medium;
          font-size: 12px;
          color: ${colors.white};
        }
        .calc-result {
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: ${colors.white};
          height: 62px;
          border-radius: 20px;
          color: ${colors.red};
          font-family: Avenir-Heavy;
          font-size: 24px;
          text-align: center;
          margin-top: 15px;
        }


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

        .landing-content h2 {
            text-align: left;
            font-size: 24px;
            color: ${colors.darkGrey};
            font-family: Avenir-Black;
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