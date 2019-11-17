import App, { Container } from 'next/app'
import React from 'react'
import withReduxStore from '../lib/with-redux-store'
import { logOut } from '../redux/actions'
import { Provider } from 'react-redux'
import Router, { withRouter } from 'next/router';

import axios from "axios"
import config from "../config.js"

export const instance = axios.create({
    baseURL: config.api_url,
    timeout: 10000,
    params: {} // do not remove this, its added to add params later in the config
});

const whitelisted_routes = [
  '/',
  '/signup',
  '/login',
]

const checkLoggedIn = ({store, router}) => {
  const state = store.getState()
  const path = router.pathname

  if (!whitelisted_routes.includes(path) && !state.loggedIn) {
    Router.push(`/login?goTo=${router.asPath}`)
  }
}

class MyApp extends App {
  
  componentDidMount() {
    checkLoggedIn({ store: this.props.store, router: this.props.router })
  }


  componentWillMount() {
    // check for unauthorized calls and logout
    const UNAUTHORIZED = 401;
    this.interceptor = instance.interceptors.response.use(
      response => response,
      error => {
        const { status } = error.response;
        if (status === UNAUTHORIZED) {
          this.props.store.dispatch(logOut());
          Router.push('/')
        }
       return Promise.reject(error);
     }
    );

  }

  componentWillUnmount() {
    instance.interceptors.request.eject(this.interceptor);
  }

  render () {

    const { Component, pageProps, store, router } = this.props
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}

export default withReduxStore(MyApp)