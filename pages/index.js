import Link from 'next/link'
import { connect } from 'react-redux'
import withLayout from '../components/Layout';
import Button from '../components/Button';
import colors from '../lib/colors'


const Index = (props) => {
	return (
	<div className="container">
		<div className="box">
			<Link href="/signup">
				<div className="button">
					{!props.loggedIn && <Button title="Get started"
							primary={true}
					/>}
				</div>
			</Link>
		</div>
    <style jsx>{`
      .container { 
        display: flex;
        justify-content: center;
      	padding: 75px 0px 75px 0px;
      }
      .button {
      	width: 30vw;
        height: 10vh;
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
)};


const mapStateToProps = state => {
    return {
        loggedIn: state.loggedIn,
    };
};


export default connect(
  mapStateToProps,
  null,
)(withLayout(Index))