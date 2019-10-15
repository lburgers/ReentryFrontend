import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import Link from 'next/link'
import colors from "../lib/colors"
import Button from './Button'

import { logOut, switchPage } from '../redux/actions'

export const Header = (props) => (
    <div className="header">
        <div className="left-header">
            <img src={"/static/creditclaim.svg"} />
            {props.loggedIn && 
                <div className="menu-items">
                    <div className={`${props.activeSection == 'candidates' ? 'active-': ''}menu-item`}
                         onClick={() => props.switchPage('candidates')}
                    >
                        Candidates
                    </div>
                    <div className={`${props.activeSection == 'info' ? 'active-': ''}menu-item`}
                         onClick={() => props.switchPage('info')}
                    >
                        Your Info
                    </div>
                </div>
            }
        </div>
        <div className={"header-buttons"}>
            {!props.loggedIn && 
                [
                <Link href={'/login'} key={1}>
                    <div className={"login-button"}>
                        <h1>Login</h1>
                    </div>
                </Link>,
                <Link href={'/signup'} key={2}>
                    <div className={"getstarted-button"}>
                        <Button title={"Get Started"}
                                height={50}
                                width={170}
                        />
                    </div>
                </Link>]
            }
            {props.loggedIn && 
                <div className={"logout-button"}
                     onClick={() => props.logOut()}>
                     <h1>Logout</h1>
                </div>
            }
        </div>
        <style jsx >{`

            .left-header {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
            }

            .menu-items {
                margin-left: 60px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
            }
            .menu-item {
                font-size: 18px;
                font-family: Avenir-Medium;
                color: ${colors.primary};
                margin-right: 18px;
            }
            .active-menu-item {
                color: ${colors.red};
                font-size: 18px;
                font-family: Avenir-Black;
                margin-right: 18px;
            }

            .header {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                padding: 36px 40px;
            }
            .header-buttons {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
            }
            .login-button {
                height: 50px;
                color: ${colors.primary};
            }
            .logout-button {
                color: ${colors.primary};
                font-size: 18px;
                font-family: Avenir-Black;
            }
            .getstarted-button {
                margin-left: 42px;
            }
        `}</style>
    </div>
)


const withLayout = Page => {
      const Layout = (props) => (
      <div>
        <Header {...props} />
      	<div className={"page-content"}>
    	  	<div className={"background-rectangle"}/>

    	    <div className="modal">
    		    <Page {...props} />
    		</div>
    	</div>

        <style jsx global>{`

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
        	.modal {
        		align-self: center;
                background-color: ${colors.white};
                margin: 100px 0;
                padding: 70px;
                border-radius: 20px;
                box-shadow: 0 2px 20px 0 rgba(8,69,61,0.05);
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
    		h2,h3,input,span{
    			font-family: Avenir-Medium;
    		}
    		a,p {
    			font-family: Avenir-Light;
    		}
    		h1 {
    			font-family: Avenir-Black;
    			font-size: 18px;
    		}
        `}</style>
      </div>
    )

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

    return connect(
      mapStateToProps,
      mapDispatchToProps
    )(Layout)

};

export default withLayout

