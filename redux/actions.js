import db from '../services/db'

export const actionTypes = {
	'CREATE_INIT': 'CREATE_INIT',
	'CREATE_SUCCESS': 'CREATE_SUCCESS',
	'CREATE_FAIL': 'CREATE_FAIL',
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

export const createUserSuccess = (user) => {
  return { type: actionTypes.CREATE_SUCCESS, user }
}

export const loginInit = () => {
  return { type: actionTypes.LOGIN_INIT }
}

export const loginFail = (error) => {
  return { type: actionTypes.LOGIN_FAIL, error }
}

export const loginSuccess = (user) => {
  return { type: actionTypes.LOGIN_SUCCESS, user }
}

export const logOut = () => {
  return { type: actionTypes.LOGOUT }
}

export const createUser = (userInfo) => {
	return async (dispatch, getState) => {
		dispatch(createUserInit())
		const state = getState()

		if (!state.loggedIn) {
			if (userInfo.employer && !userInfo.employee) {
				try {
					await db.employer.add(userInfo)
					const response = await db.employer.authenticate({
						email: userInfo.email,
						password: userInfo.password,
					})
					const user = response.data
					dispatch(createUserSuccess(user))
				} catch (e) {
					dispatch(createUserFail(e))
				}
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
			// TODO: add employee login handling
			try {
				const response = await db.employer.authenticate({
					email: creds.email,
					password: creds.password,
				})
				const user = response.data
				dispatch(loginSuccess(user))
			} catch (e) {
				dispatch(loginFail(e))
			}
		} else {
			dispatch(loginFail('Already logged in'))
		}
	}
}