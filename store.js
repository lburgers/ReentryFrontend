import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

import reducer, { initialState } from './redux/reducer'

const persistentFields = {
  'loggedIn': true,
  'user': true,
  'user_type': true,  
}


// load to local storage
export const loadState = () => {
  try {
    let serializedState = localStorage.getItem('reduxState'); // TODO: special app id
    if (serializedState === null) {
      return undefined;
    }

    // TODO: add specific persistent fields
    // Object.keys(serializedState).forEach((field) => {
    //   if (!persistentFields[field]) {
    //     serializedState[field] = initialState[field]
    //   }
    // })

    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// save to local storage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('reduxState', serializedState);
  } catch {
    // ignore write errors
  }
};

export function initializeStore (initial = initialState) {
	const persistedState = loadState()
	const store = createStore(
		reducer,
		persistedState ? persistedState : initial,
		composeWithDevTools(applyMiddleware(thunkMiddleware))
	)
	store.subscribe(() => {
	  saveState(store.getState())
	});
	return store
}