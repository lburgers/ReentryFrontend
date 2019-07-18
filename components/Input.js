import colors from "../lib/colors"

const Input = (props) => (
  <div className="container">
  	<input onChange={(e) => props.onChange(e.target.value)}
  		   placeholder={props.placeholder}
  		   value={props.value}
  	/>
	<style jsx>{`
		.container {
		}
		input {
		  width: 100%;
		  font-size: 13px;
		  line-height: 30px;
		  border-width: 0 0 1px 0;
		  border-color: ${props.error ? 'red' : colors.darkGrey};
		  font-size: 15px;
		  font-family: Avenir-Light;
		  color: ${props.error ? 'red' : colors.blue};
		}
    `}</style>
  </div>
);

export default Input;