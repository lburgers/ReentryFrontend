import employerService from './employerService'
import employeeService from './employeeService'

const db = {
	employer: employerService,
	employee: employeeService,
}

export default db