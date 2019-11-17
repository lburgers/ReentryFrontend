const screen = {
	title: 'Login to your account',
	type: 'input',
	fields: [
		{
			name: 'username',
			desc: 'Email or phone number',
			placeholder: '',
			validator: (email) => (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)),
			req: true,
		},
		{
			name: 'password',
			desc: 'Password',
			placeholder: 'must be more than 6 digits w/ a capital, lowercase, and digit',
			validator: (password) => password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/) !== null,
			req: true,
		},
	],
	primaryButton: 'Submit',
}

const pages = [
	screen
]

export default pages
