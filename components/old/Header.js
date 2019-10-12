import Link from 'next/link'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { logOut } from '../redux/actions'

import colors from "../lib/colors"
import Button from './Button'

const Header = (props) => (
  <div className="navbar">
  	<Link href={props.loggedIn ? '/app' : '/'}>
	  	<h1>Prisonplicity</h1>
  	</Link>
	<ul>
		<li>
		  <a>About us</a>
		</li>
		<li>
		  <a>FAQ</a>
		</li>
		<li>
		  	<Link href={props.loggedIn ? '/' : '/login'}>
			<div className="login" onClick={() => {
				if (props.loggedIn) {
					props.logOut()
				}
			}} >
			  <a>{props.loggedIn ? 'Logout' : 'Login'}</a>
			</div>
			</Link>
		</li>
	</ul>
	<style jsx>{`
		.navbar {
			position: absolute;
			top: 0px;
			background-color: white;
			height: 78px;
			width: 100%;
			box-shadow: 0px 2px 4px 0px ${colors.shadow};
			display: flex;
			flex: 1;
			justify-content: space-between;
			align-items: center;
		}
		.login {
			background-color: ${colors.blue};
			width: 84px,
			height: 36px;
			border-radius: 16px;
		
		}
		h1 {
			margin-left: 2vw;
		    line-height:51px;
			font-size: 27px;
			color: ${colors.black};
		}
		li{
		   list-style-type: none;
	       margin: 0 1vw;
	       font-size: 3vh;
		}
		ul{
		  margin: 0;
		  padding: 0;
		  display: flex;
		}		
		a{
		  text-decoration: none;
		  padding: 2vw;
		  font-size: 18px;
		  color: ${colors.black};
		}
		.login a {
			color: ${colors.white};
		}

    `}</style>
  </div>
);
const mapStateToProps = state => {
    return {
        loggedIn: state.loggedIn,
    };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      logOut,
    },
    dispatch
  );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);