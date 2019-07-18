import Button from '../Button';
import colors from '../../lib/colors'

const AccountSection = (props) => {
	const { token, __v, _id, createdDate, ...toDisplay } = props.user
	return (
	<div className='account-section'>
	   {Object.keys(toDisplay).map((key, i) => {
	   	if (key === 'ssn') {
	   		return (
	   			<div key={i}>
		   			<p>{key}: ###-##-####</p>
		   		</div>
	   		)
	   	}
	   	return (
   			<div key={i}>
		   		<p>{key}: {props.user[key]}</p>
		   	</div>
	   	)
	   })}
	   <div className="update-button">
		   <Button
		   		title={"Update Account"}
		   		primary={true}
		   />
	   </div>
		<style jsx>{`
			.account-section {
				margin-top: 25px;
			  	border: solid ${colors.grey};
			  	border-width: 1px 0 0 0;
			}
			.update-button {
				width: 150px;
				height: 50px;
			}
	  `}</style>
	</div>
	)
}

export default AccountSection