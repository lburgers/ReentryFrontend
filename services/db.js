import employerService from './employerService'
import employeeService from './employeeService'
import requestService from './requestService'

const db = {
	employer: employerService,
	employee: employeeService,
	request: requestService,
}

export default db