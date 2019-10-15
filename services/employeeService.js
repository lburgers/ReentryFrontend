import { instance } from '../pages/_app'
import { loadState } from '../store'

const base_url = '/employees/'

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
		const response = await instance.post(base_url + 'create', params)
		return response
	} catch (e) {
		throw e
	}
}

const update = async (id, params) => {
	try {
		instance.defaults.headers.common['Authorization'] = authHeader()['Authorization'];
		const response = await instance.put(base_url + id, params)
		return response.data
	} catch (e) {
		throw e
	}
}

const _delete = async (id) => {
	try {
		instance.defaults.headers.common['Authorization'] = authHeader()['Authorization'];
		const response = await instance.delete(base_url + id)
		return response.data
	} catch (e) {
		throw e
	}
}

const get = async (id) => {
	try {
		instance.defaults.headers.common['Authorization'] = authHeader()['Authorization'];
		const response = await instance.get(base_url + id)
		return response.data
	} catch (e) {
		throw e
	}
}

const search = async (query) => {
	try {
		instance.defaults.headers.common['Authorization'] = authHeader()['Authorization'];
		const response = await instance.get(base_url + '/search?q=' + query)
		return response.data
	} catch (e) {
		throw e
	}
}

const authenticate = async ({email, phone_number, password}) => {
	try {
		const response = await instance.post(base_url + 'authenticate', {email, phone_number, password})
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