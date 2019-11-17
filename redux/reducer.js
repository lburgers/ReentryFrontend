import { actionTypes } from './actions'

export const initialState = {
  activeSection: 'candidates',
	loggedIn: false,
	user: null,
  user_type: null,
  isCreatingAccount: false,
  errorCreatingAccount: null,
  isUpdatingAccount: false,
  errorUpdatingAccount: null,
  isLoggingIn: false,
  errorLoggingIn: null,
  isCreatingRequest: false,
  errorCreatingRequest: null,
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
        user_type: null,
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
        user_type: action.user_type,
        loggedIn: true,
      }
    case actionTypes.UPDATE_INIT:
      return {
        ...state,
        isUpdatingAccount: true,
        errorUpdatingAccount: null,
      }
    case actionTypes.UPDATE_FAIL:
      return {
        ...state,
        isUpdatingAccount: false,
        errorUpdatingAccount: action.error,
      }
    case actionTypes.UPDATE_SUCCESS:
      return {
        ...state,
        isUpdatingAccount: false,
        errorUpdatingAccount: false,
        user: action.user,
      }
    case actionTypes.CREATE_REQUEST_INIT:
      return {
        ...state,
        isCreatingRequest: true,
        errorCreatingRequest: null,
      }
    case actionTypes.CREATE_REQUEST_FAIL:
      return {
        ...state,
        isCreatingRequest: false,
        errorCreatingRequest: action.error,
      }
    case actionTypes.CREATE_REQUEST_SUCCESS:
      return {
        ...state,
        isCreatingRequest: false,
        errorCreatingRequest: false,
        activeSection: 'candidates',
      }
    case actionTypes.LOGIN_INIT:
      return {
        ...state,
        loggedIn: false,
        user: null,
        user_type: null,
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
        user_type: action.user_type,
        loggedIn: true,
      }

    case actionTypes.LOGOUT:
      return initialState
    
    case actionTypes.SWITCH_PAGE:
      return {
        ...state,
        activeSection: action.page
      }

    default:
      return state
  }
}

export default reducer