// REQ:
// Employer's name
// Telephone no.
// EIN
// Street address
// City or town, state, and ZIP code

// OPT:
// Person to contact, if different from above
// Telephone no.

// TIME OF OFFER:
// If, based on the individual’s age and home address, he or she is a member of group 4 or 6 (as described under Members of
// 	Targeted Groups in the separate instructions), enter that group number (4 or 6)

// Date applicant:
// 	gave information 	 was offered job	was hired	started job

// employer signature
// title
// date

// TODO add validators


const page1 = {
	title: 'Are you a?',
	type: 'choice',
	fields: [
		{
			name: 'employer',
			title: 'Employer',
			goTo: 2,
		},
		{
			name: 'employee',
			title: 'Job seeker',
			goTo: 1,
		},
	],
	primaryButton: 'Next',
	// secondaryButton: 'Cancel',
}

const page2 = {
	title: null,
	type: 'input',
	fields: [
		{
			name: 'employer_name',
			desc: 'Employer\'s name *',
			placeholder: '',
			req: true,
		},
		{
			name: 'phone_number',
			desc: 'Telephone no. *',
			placeholder: '1234567890',
			validator: (phone_number) => phone_number.match(/^\d{10}$/) !== null,
			req: true,
		},
		{
			name: 'ein',
			desc: 'EIN *',
			placeholder: '',
			validator: (ein) => ein.match(/^\d{9}$/) !== null,
			req: true,
		},
	],
	primaryButton: 'Next',
	secondaryButton: 'Back',
	backTo: 0,
}

const page3 = {
	title: null,
	type: 'input',
	fields: [
		{
			name: 'street_address',
			desc: 'Street Address *',
			placeholder: '1 Elm Street',
			req: true,
		},
		{
			name: 'city',
			desc: 'City or town *',
			placeholder: 'e.g. New Haven',
			req: true,
		},
		{
			name: 'state',
			desc: 'State *',
			placeholder: 'CT',
			validator: (state) => state.match(/^[A-Z]{2}$/) !== null,
			req: true,
		},
		{
			name: 'zipcode',
			desc: 'ZIP code *',
			placeholder: '06590',
			validator: (zip) => zip.match(/^\d{5}$/) !== null,
			req: true,
		},
	],
	primaryButton: 'Next',
	secondaryButton: 'Back',
}

const page4 = {
	title: 'Finish creating account',
	type: 'input',
	fields: [
		{
			name: 'email',
			desc: 'Email',
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
	secondaryButton: 'Back',
}

const page5 = {
	title: 'employee stuff',
	type: 'input',
	fields: [],
	primaryButton: 'Submit',
	secondaryButton: 'Back',
}

const pages = [
	page1,
	page5,
	page2,
	page3,
	page4,
]

export default pages
