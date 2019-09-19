import App, { Container } from 'next/app'
import React from 'react'
import withReduxStore from '../lib/with-redux-store'
import { Provider } from 'react-redux'
import Router, { withRouter } from 'next/router';

// TODO: add routing away from unauthorized pages

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