import { instance } from '../pages/_app'
import { loadState } from '../store'

const base_url = '/requests/'

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
	const response = await instance.post(base_url + 'create', params)
	return response
}

const sign = async (id, type) => {
	instance.defaults.headers.common['Authorization'] = authHeader()['Authorization'];
	const response = await instance.post(base_url + 'sign', {id, type})
	return response.data
}

const update = async (id, params) => {
	instance.defaults.headers.common['Authorization'] = authHeader()['Authorization'];
	const response = await instance.put(base_url + id, params)
	return response.data
}

const _delete = async (id) => {
	instance.defaults.headers.common['Authorization'] = authHeader()['Authorization'];
	const response = await instance.delete(base_url + id)
	return response.data
}

const get = async (id) => {
	instance.defaults.headers.common['Authorization'] = authHeader()['Authorization'];
	const response = await instance.get(base_url + id)
	return response.data
}

const getAll = async ({id, user_type}) => {
	instance.defaults.headers.common['Authorization'] = authHeader()['Authorization'];
	const response = await instance.get(base_url + `getAll?${user_type}_id=${id}`)
	return response.data
}

const viewForm = async({id, token, type}) => {
	instance.defaults.headers.common['Authorization'] = !!token ? token : authHeader()['Authorization'];
	const response = await instance.get(base_url + `viewForm?id=${id}&type=${type}`, {
        responseType: 'arraybuffer',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/pdf'
        }
    })
	return response.data
}

const requestService = {
	add,
	update,
	delete: _delete,
	get,
	getAll,
	viewForm,
	sign,
}

export default requestService