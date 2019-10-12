import Button from './Button';
import colors from '../lib/colors'
import Link from 'next/link'

const Table = (props) => {
	return (
	<div>
		{!!props.headers && <div className="table-header">
			<div style={{display: 'flex', flex: 2}}>
				<h2>{props.headers[0]}</h2>
			</div>
			<div style={{display: 'flex', flex: 4}}>
				<h2>{props.headers[1]}</h2>
			</div>
			<div style={{display: 'flex', flex: 2}}>
				<h2>{props.headers[2]}</h2>
			</div>
			<div />
		</div>}
		{props.entries.map((entry, i) => (
			<div className='entry' key={i}>
				<div style={{display: 'flex', flex: 2}}>
					<span>{entry[0]}</span>
				</div>
				<div style={{display: 'flex', flex: 4}}>
					<span>{entry[1]}</span>
				</div>
				<div style={{display: 'flex', flex: 1}}>
					<span className='refund'>{entry[2]}</span>
				</div>
				<div className={"contact-button"} >
					<Link href={props.buttonLink + '?id=' + entry[3]}>
						<Button title={props.buttonText} primary={true}/>
					</Link>
				</div>
			</div>
		))}

		<style jsx>{`
		  .table-header {
		  	margin-top: 20px;
		  	display: flex;
		  	flex: 1;
		  	justify-content: space-between;
		  	flex-direction: row;
		  }
		  h2 {
		  	font-size: 15px;
		  	color: ${colors.darkGrey};
		  }
		  span {
		  	font-size: 15px;
		  	font-family: Avenir-Light;
		  	color: ${colors.black};
		  }
		  .refund {
		  	color: ${colors.green};
		  }
		  .entry {
		  	display: flex;
		  	flex: 1;
		  	justify-content: space-between;
		  	flex-direction: row;
		  	border: solid ${colors.grey};
		  	border-width: 0 0 1px 0;
		  	background-color: 'white';
		  	padding-bottom: 5px;
		  	margin-top: 9px;
		  }
		  .contact-button {
		  	display: flex;
		  	flex: 1;
		  	width: 75px;
		  }`}</style>
	</div>
	)
}

export default Table