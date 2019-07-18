
const gaveInformationDate = {
	title: 'Enter information to finish request',
	type: 'input',
	fields: [
		{
			name: 'gave_information_date',
			desc: 'Date applicant gave information: *',
			placeholder: 'MM/DD/YYYY',
			validator: (dob) => (/^(((0)[0-9])|((1)[0-2]))(\/)([0-2][0-9]|(3)[0-1])(\/)\d{4}$/.test(dob)),
			req: true,
		},
	],
	primaryButton: 'Next',
	// secondaryButton: 'Back',
}

const jobOfferedDate = {
	title: null,
	type: 'input',
	fields: [
		{
			name: 'offered_job_date',
			desc: 'Date applicant was offered job: *',
			placeholder: 'MM/DD/YYYY',
			validator: (dob) => (/^(((0)[0-9])|((1)[0-2]))(\/)([0-2][0-9]|(3)[0-1])(\/)\d{4}$/.test(dob)),
			req: true,
		},
	],
	primaryButton: 'Next',
	secondaryButton: 'Back',
}

const hiredDate = {
	title: null,
	type: 'input',
	fields: [
		{
			name: 'hired_date',
			desc: 'Date applicant was hired: *',
			placeholder: 'MM/DD/YYYY',
			validator: (dob) => (/^(((0)[0-9])|((1)[0-2]))(\/)([0-2][0-9]|(3)[0-1])(\/)\d{4}$/.test(dob)),
			req: true,
		},
	],
	primaryButton: 'Next',
	secondaryButton: 'Back',
}

const startedJobDate = {
	title: null,
	type: 'input',
	fields: [
		{
			name: 'started_job_date',
			desc: 'Date applicant was offered job: *',
			placeholder: 'MM/DD/YYYY',
			validator: (dob) => (/^(((0)[0-9])|((1)[0-2]))(\/)([0-2][0-9]|(3)[0-1])(\/)\d{4}$/.test(dob)),
			req: true,
		},
	],
	primaryButton: 'Next',
	secondaryButton: 'Back',
}

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

const startingWage = {
	title: null,
	type: 'input',
	fields: [
		{
			name: 'starting_wage',
			desc: 'What will the employees starting wage be (roughly)?',
			placeholder: 'XX.XX',
			validator: (wage) => (/^\d+(.\d{1,2})?$/.test(wage)),
			req: true,
		},
	],
	primaryButton: 'Submit',
	secondaryButton: 'Back',
	backTo: 4,
}


const pages = [
	gaveInformationDate,
	jobOfferedDate,
	hiredDate,
	startedJobDate,
	workedBefore,
	pastWorkDate,
	startingWage,
]

export default pages
