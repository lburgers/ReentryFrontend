import db from '../services/db'
import Router from 'next/router'

export const user_types = {
	'employer': 'employer',
	'employee': 'employee'
}

export const actionTypes = {
	'CREATE_INIT': 'CREATE_INIT',
	'CREATE_SUCCESS': 'CREATE_SUCCESS',
	'CREATE_FAIL': 'CREATE_FAIL',
	'CREATE_REQUEST_INIT': 'CREATE_REQUEST_INIT',
	'CREATE_REQUEST_SUCCESS': 'CREATE_REQUEST_SUCCESS',
	'CREATE_REQUEST_FAIL': 'CREATE_REQUEST_FAIL',
	'LOGIN_INIT': 'LOGIN_INIT',
	'LOGIN_SUCCESS': 'LOGIN_SUCCESS',
	'LOGIN_FAIL': 'LOGIN_FAIL',
	'LOGOUT': 'LOGOUT',
}

// ACTIONS
export const createUserInit = () => {
  return { type: actionTypes.CREATE_INIT }
}

export const createUserFail = (error) => {
  return { type: actionTypes.CREATE_FAIL, error }
}

export const createUserSuccess = (user, user_type) => {
  return { type: actionTypes.CREATE_SUCCESS, user, user_type }
}

export const createRequestInit = () => {
  return { type: actionTypes.CREATE_REQUEST_INIT }
}

export const createRequestFail = (error) => {
  return { type: actionTypes.CREATE_REQUEST_FAIL, error }
}

export const createRequestSuccess = () => {
  return { type: actionTypes.CREATE_REQUEST_SUCCESS }
}

export const loginInit = () => {
  return { type: actionTypes.LOGIN_INIT }
}

export const loginFail = (error) => {
  return { type: actionTypes.LOGIN_FAIL, error }
}

export const loginSuccess = (user, user_type) => {
  return { type: actionTypes.LOGIN_SUCCESS, user, user_type }
}

export const logOut = () => {
  return { type: actionTypes.LOGOUT }
}

export const createRequest = (requestInfo, employee_id) => {
	return async (dispatch, getState) => {
		const state = getState()
		dispatch(createRequestInit())
		if (state.loggedIn && state.user_type === 'employer') {
			try {
				requestInfo = {
					employer_id: state.user._id,
					employee_id: employee_id,
					stage: 0, // employee exists but has not yet accepted
					...requestInfo,
				}
				await db.request.add(requestInfo)
				dispatch(createRequestSuccess())
				Router.push('/app')
			} catch (e) {
				Router.push(`/jobseeker/${employee_id}`)
				dispatch(createRequestFail(e))
			}
		} else {
			Router.push('/login')
			dispatch(createRequestFail('User not logged in'))
		}
	}
}

export const createUser = (userInfo) => {
	return async (dispatch, getState) => {
		dispatch(createUserInit())
		const state = getState()
		if (!state.loggedIn) {
			if (userInfo.employer && !userInfo.employee) {
				// employer auth
				try {
					await db.employer.add(userInfo)
					const response = await db.employer.authenticate({
						email: userInfo.email,
						password: userInfo.password,
					})
					const user = response.data
					dispatch(createUserSuccess(user, user_types.employer))
					Router.push('/app')
				} catch (e) {
					dispatch(createUserFail(e))
				}

			} else if (userInfo.employee && !userInfo.employer) {
				// employee auth
				try {
					await db.employee.add(userInfo)
					const response = await db.employee.authenticate({
						email: userInfo.email,
						phone_number: userInfo.phone_number,
						password: userInfo.password,
					})
					const user = response.data
					dispatch(createUserSuccess(user, user_types.employee))
					Router.push('/app')
				} catch (e) {
					dispatch(createUserFail(e))
				}

			} else {
				dispatch(createUserFail('Something went wrong'))
			}
		} else {
			dispatch(createUserFail('Already logged in'))
		}
	}
}

export const loginUser = (creds) => {
	return async (dispatch, getState) => {
		dispatch(loginInit())
		const state = getState()
		if (!state.loggedIn) {
			let employer = null
			let employee = null

			try {
				const employerResponse = await db.employer.authenticate({
					email: creds.username,
					phone_number: creds.username,
					password: creds.password,
				})
				employer = employerResponse.data
			} catch (e) {}
			
			try {
				const employeeResponse = await db.employee.authenticate({
					email: creds.username,
					phone_number: creds.username,
					password: creds.password,
				})
				employee = employeeResponse.data
			} catch (e) {}
			
			if (employer) {
				Router.push('/app')
				dispatch(loginSuccess(employer, user_types.employer))
			} else if (employee) {
				Router.push('/app')
				dispatch(loginSuccess(employee, user_types.employee))
			} else {
				dispatch(loginFail('Unable to login'))
			}

		} else {
			Router.push('/app')
			dispatch(loginFail('Already logged in'))
		}
	}
}