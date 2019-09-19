import axios from "axios"
import config from "../config.js"

import { loadState } from '../store'

const base_url = config.api_url + '/employees/'

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
		axios.defaults.baseURL = base_url
		const response = await axios.post('create', params)
		return response
	} catch (e) {
		throw e
	}
}

const update = async (id, params) => {
	try {
		axios.defaults.baseURL = base_url
		axios.defaults.headers.common['Authorization'] = authHeader()['Authorization'];
		const response = await axios.put(id, params)
		return response.data
	} catch (e) {
		throw e
	}
}

const _delete = async (id) => {
	try {
		axios.defaults.baseURL = base_url
		axios.defaults.headers.common['Authorization'] = authHeader()['Authorization'];
		const response = await axios.delete(id)
		return response.data
	} catch (e) {
		throw e
	}
}

const get = async (id) => {
	try {
		axios.defaults.baseURL = base_url
		axios.defaults.headers.common['Authorization'] = authHeader()['Authorization'];
		const response = await axios.get(id)
		return response.data
	} catch (e) {
		throw e
	}
}

const search = async (query) => {
	try {
		axios.defaults.baseURL = base_url
		axios.defaults.headers.common['Authorization'] = authHeader()['Authorization'];
		const response = await axios.get('/search?q=' + query)
		return response.data
	} catch (e) {
		throw e
	}
}

const authenticate = async ({email, phone_number, password}) => {
	try {
		axios.defaults.baseURL = base_url
		const response = await axios.post('authenticate', {email, phone_number, password})
		return response
	} catch (e) {
		throw e
	}
}

const employeeService = {
	add,
	update,
	delete: _delete,
	get,
	search,
	authenticate,
}

export default employeeService