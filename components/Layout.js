import Header from './Header'

const withLayout = Page => {
  return (props) => (
  <div>
    <Header />
    <div className="page">
	    <Page {...props} />
	</div>

    <style jsx global>{`
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
		h2,h3,a,input,span{
			font-family: Avenir-Medium;
		}
		h1 {
			font-family: Avenir-Medium;
		}
    `}</style>
  </div>
)};

export default withLayout;