import colors from "../lib/colors"

const Input = (props) => (
  <div className="container">
  	<input 
		   onChange={(e) => props.onChange(e.target.value)}
	  	   onBlur={props.onBlur}
	  	   onFocus={props.onFocus}
  		   placeholder={props.placeholder}
  		   value={props.value}
  	/>
	<style jsx>{`
		.container {
		  display: flex;
		  width: 100%;
		  height: 100%;
		  justify-content: center;
		  align-items: center;
		  background-color: ${colors.grey};
		  padding: 5px;
		  border-radius: 7px;
		}
		input {
		  width: 100%;
		  font-size: 13px;
		  border-width: 0;
		  font-size: 18px;
		  font-family: Avenir-Heavy;
		  color: ${props.error ? 'red': colors.primary};
		  background-color: ${colors.grey};
		  text-align: center;
		}
    `}</style>
  </div>
);

export default Input;