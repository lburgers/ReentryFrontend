import colors from "../lib/colors"

const Input = (props) => (
  <div className="container">
  	<input 
		   onChange={props.onChange ? (e) => props.onChange(e.target.value) : () => {} }
		   onKeyDown={props.onKeyPress ? (e) => props.onKeyPress(e) : () => {}}
	  	   onBlur={props.onBlur}
	  	   onFocus={props.onFocus}
  		   placeholder={props.placeholder}
  		   value={props.value}
  	/>
	<style jsx>{`
		.container {
		  display: flex;
		  flex: 1;
		  height: 100%;
		  justify-content: center;
		  align-items: center;
		  background-color: ${props.backgroundColor || colors.grey};
		  padding: 5px;
		  border-radius: 7px;
		}
		input {
		  width: 100%;
		  font-size: 13px;
		  border-width: 0;
		  font-size: 18px;
		  font-family: Avenir-Heavy;
		  color: ${props.error ? 'red': props.primary || colors.primary};
		  background-color: transparent;
		  text-align: center;
		}
		input::placeholder {
			color: ${props.placeholderColor || colors.darkGrey}
		}

    `}</style>
  </div>
);

export default Input;