export const request = [
	[
		{
			name: 'starting_wage',
			title: 'Starting wage',
			placeholder: 'XX.XX',
			validator: (wage) => (/^\d+(.\d{1,2})?$/.test(wage)),
			req: true,
		},
		{
			name: 'position',
			title: 'Position',
			req: true,
		},
	],
	[
		{
			name: 'gave_information_date',
			title: 'Applicant gave information',
			placeholder: 'MM/DD/YYYY',
			validator: (dob) => (/^(((0)[0-9])|((1)[0-2]))(\/)([0-2][0-9]|(3)[0-1])(\/)\d{4}$/.test(dob)),
			req: true,
		},
		{
			name: 'offered_job_date',
			title: 'Applicant offered job',
			placeholder: 'MM/DD/YYYY',
			validator: (dob) => (/^(((0)[0-9])|((1)[0-2]))(\/)([0-2][0-9]|(3)[0-1])(\/)\d{4}$/.test(dob)),
			req: true,
		},
		{
			name: 'hired_date',
			title: 'Applicant was hired',
			placeholder: 'MM/DD/YYYY',
			validator: (dob) => (/^(((0)[0-9])|((1)[0-2]))(\/)([0-2][0-9]|(3)[0-1])(\/)\d{4}$/.test(dob)),
			req: true,
		},
		{
			name: 'started_job_date',
			title: 'Applicant started job',
			placeholder: 'MM/DD/YYYY',
			validator: (dob) => (/^(((0)[0-9])|((1)[0-2]))(\/)([0-2][0-9]|(3)[0-1])(\/)\d{4}$/.test(dob)),
			req: true,
		},
	],
	[
		{
			name: 'employee_name',
			title: 'Applicant name',
			req: true,
		},
		{
			name: 'email',
			title: 'Email',
			placeholder: '',
			validator: (email) => (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)),
			req: true,
		},
	    {
	    	name: 'phone_number',
	    	title: 'Phone number',
	    	placeholder: '1234567890',
	    	validator: (phone_number) => phone_number.match(/^\d{10}$/) !== null,
	    	req: true,
	    },
	],
]



const workedBefore = {
	title: 'Has this employee worked for you before?',
	type: 'choice',
	fields: [
		{
			name: 'have_worked_before',
			title: 'Yes',
			goTo: 5,
		},
		{
			name: 'has_not_worked_before',
			title: 'No',
			goTo: 6,
		},
	],
	primaryButton: 'Next',
	secondaryButton: 'Back',
}

const pastWorkDate = {
	title: null,
	type: 'input',
	fields: [
		{
			name: 'last_employment_date',
			desc: 'If YES, enter last date of employment: *',
			placeholder: 'MM/DD/YYYY',
			validator: (dob) => (/^(((0)[0-9])|((1)[0-2]))(\/)([0-2][0-9]|(3)[0-1])(\/)\d{4}$/.test(dob)),
			req: true,
		},
	],
	primaryButton: 'Next',
	secondaryButton: 'Back',
}