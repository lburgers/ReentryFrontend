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


const chooseType = {
	title: 'Are you?',
	type: 'choice',
	fields: [
		{
			name: 'employer',
			title: 'An employer',
			goTo: 1,
		},
		{
			name: 'employee',
			title: 'A job seeker',
			goTo: 4,
		},
	],
	primaryButton: 'Next',
	// secondaryButton: 'Cancel',
}

const employerInfo = {
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

const employerAddress = {
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

const employerAccount = {
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

const employeeInfo = {
	title: 'Create a job seeker account',
	type: 'input',
	fields: [
		{
			name: 'first_name',
			desc: 'First name *',
			placeholder: '',
			req: true,
		},
		{
			name: 'middle_initial',
			desc: 'Middle initial',
			placeholder: '',
			req: false,
		},
		{
			name: 'last_name',
			desc: 'Last name *',
			placeholder: '',
			req: true,
		},
	],
	primaryButton: 'Next',
	secondaryButton: 'Back',
	backTo: 0,
}

const employeeAddressAndSSN = {
	title: null,
	type: 'input',
	fields: [
		{
			name: 'street_address',
			desc: 'Street address where you live *',
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
			name: 'county',
			desc: 'County *',
			placeholder: 'e.g. New Haven County',
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
		{
			name: 'ssn',
			desc: 'Social Security Number *',
			placeholder: '###-##-####',
			validator: (ssn) => ssn.match(/^\d{3}-\d{2}-\d{4}$/) !== null,
			req: true,
		},
	],
	primaryButton: 'Next',
	secondaryButton: 'Back',
}

const chooseUnder40 = {
	title: 'How old are you?',
	type: 'choice',
	fields: [
		{
			name: 'under40',
			title: 'Under 40',
			goTo: 7,
		},
		{
			name: 'over40',
			title: 'Over 40',
			goTo: 8,
		},
	],
	primaryButton: 'Next',
	secondaryButton: 'Back',
}


const employeeDOB = {
	title: null,
	type: 'input',
	fields: [
		{
			name: 'dob',
			desc: 'Date of birth *',
			placeholder: 'MM/DD/YYYY',
			validator: (dob) => (/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/.test(dob)),
			req: true,
		},
	],
	primaryButton: 'Next',
	secondaryButton: 'Back',
}

const employeeAccount = {
	title: 'Finish account',
	type: 'input',
	fields: [
		{
			name: 'email',
			desc: 'Email',
			placeholder: '',
			validator: (email) => (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)),
			req: false,
		},
		{
			name: 'phone_number',
			desc: 'Telephone no. *',
			placeholder: '1234567890',
			validator: (phone_number) => phone_number.match(/^\d{10}$/) !== null,
			req: true,
		},
		{
			name: 'password',
			desc: 'Password *',
			placeholder: 'must be more than 6 digits w/ a capital, lowercase, and digit',
			validator: (password) => password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/) !== null,
			req: true,
		},
	],
	primaryButton: 'Submit',
	secondaryButton: 'Back',
	backTo: 6,
}

const pages = [
	chooseType,
	employerInfo,
	employerAddress,
	employerAccount,
	employeeInfo,
	employeeAddressAndSSN,
	chooseUnder40,
	employeeDOB,
	employeeAccount,
]

export default pages
