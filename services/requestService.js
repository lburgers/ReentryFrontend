import axios from "axios"
import config from "../config.json"

import { loadState } from '../store'

const base_url = config.api_url + '/requests/'

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

const getAll = async ({id, user_type}) => {
	try {
		axios.defaults.baseURL = base_url
		axios.defaults.headers.common['Authorization'] = authHeader()['Authorization'];
		const response = await axios.get(`getAll?${user_type}_id=${id}`)
		return response.data
	} catch (e) {
		throw e
	}
}

const viewForm = async({id, token, type}) => {
	try {
		axios.defaults.baseURL = base_url
		axios.defaults.headers.common['Authorization'] = !!token ? token : authHeader()['Authorization'];
		const response = await axios.get(`viewForm?id=${id}&type=${type}`, {
            responseType: 'arraybuffer',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/pdf'
            }
        })
		return response.data
	} catch (e) {
		throw e
	}
}

const requestService = {
	add,
	update,
	delete: _delete,
	get,
	getAll,
	viewForm,
}

export default requestService