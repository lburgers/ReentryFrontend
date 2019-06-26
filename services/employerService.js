import axios from "axios"
import config from "../config.json"

import { loadState } from '../store'

const base_url = config.api_url + '/employers/'
axios.defaults.baseURL = base_url

const authHeader = () => {
    // return authorization header with jwt token
    let state = null
    if (typeof(loadState) == 'function') {
    	state = loadState()
    }

    if (state && state.user && state.user.token) {
        return { 'Authorization': 'Bearer ' + state.user.token };
    } else {
        return {};
    }
}

const add = async (params) => {
	try {
		const response = await axios.post('create', params)
		return response
	} catch (e) {
		throw e
	}
}

const update = async (id, params) => {
	try {
		axios.defaults.headers.common['Authorization'] = authHeader()['Authorization'];
		const response = await axios.put(id, params)
		return response.data
	} catch (e) {
		throw e
	}
}

const _delete = async (id) => {
	try {
		axios.defaults.headers.common['Authorization'] = authHeader()['Authorization'];
		const response = await axios.delete(id)
		return response.data
	} catch (e) {
		throw e
	}
}

const get = async (id) => {
	try {
		axios.defaults.headers.common['Authorization'] = authHeader()['Authorization'];
		const response = await axios.get(id)
		return response.data
	} catch (e) {
		throw e
	}
}

const authenticate = async ({email, password}) => {
	try {
		axios.defaults.baseURL = base_url
		const response = await axios.post('authenticate', {email, password})
		return response
	} catch (e) {
		throw e
	}
}

const employerService = {
	add,
	update,
	delete: _delete,
	get,
	authenticate,
}

export default employerService