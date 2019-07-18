import Header from './Header'
import colors from "../lib/colors"


const withLayout = Page => {
  return (props) => (
  <div>
    <Header />
    <div className="page">
	    <Page {...props} />
	</div>

    <style jsx global>{`
	  .application { 
        height: 100vh;
        left:0;
        right:0;
	  	margin: 150px 65px;
	  	padding: 45px 60px;
      	border-radius: 5px;
		background-color: ${colors.white};
		box-shadow: 0 2px 4px 0 ${colors.shadow};
	  }
		body { 
			margin: 0px;
		}
		.page {
			margin-top: 78px;
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
			font-family: Avenir-Medium;
		}
    `}</style>
  </div>
)};

export default withLayout;