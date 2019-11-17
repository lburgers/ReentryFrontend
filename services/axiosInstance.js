import axios from "axios"
import config from "../config.js"

const instance = axios.create({
    baseURL: config.api_url,
    timeout: 10000,
    params: {} // do not remove this, its added to add params later in the config
});

instance.interceptors.response.use(
  response => response,
  error => {
    console.log('tracking error', error)
    // const { status } = error.response;
    // if (status === UNAUTHORIZED) {
    //   this.props.store.dispatch(logOut());
    //   Router.push('/')
    // }
   return Promise.reject(error);
 }
);

export default instance