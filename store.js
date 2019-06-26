import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

import reducer, { initialState } from './redux/reducer'

// load to local storage
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) {
      return undefined;
    }
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