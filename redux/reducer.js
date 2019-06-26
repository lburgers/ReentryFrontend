import { actionTypes } from './actions'

export const initialState = {
	loggedIn: false,
	user: null,
  isCreatingAccount: false,
  errorCreatingAccount: null,
  isLoggingIn: false,
  errorLoggingIn: null,
}

// REDUCERS
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_INIT:
      return {
        ...state,
        isCreatingAccount: true,
        errorCreatingAccount: null,
        loggedIn: false,
        user: null,
      }
    case actionTypes.CREATE_FAIL:
      return {
        ...state,
        isCreatingAccount: false,
        errorCreatingAccount: action.error,
      }
    case actionTypes.CREATE_SUCCESS:
      return {
        ...state,
        isCreatingAccount: false,
        errorCreatingAccount: false,
        user: action.user,
        loggedIn: true,
      }
    case actionTypes.LOGIN_INIT:
      return {
        ...state,
        loggedIn: false,
        user: null,
        isLoggingIn: false,
        errorLoggingIn: null,
      }
    case actionTypes.LOGIN_FAIL:
      return {
        ...state,
        isLoggingIn: false,
        errorLoggingIn: action.error,
      }
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        errorLoggingIn: false,
        user: action.user,
        loggedIn: true,
      }

    case actionTypes.LOGOUT:
      return initialState

    default:
      return state
  }
}

export default reducer