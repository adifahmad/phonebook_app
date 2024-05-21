import axios from "axios"

const request = axios.create({
    baseURL: 'http://192.168.1.42:3001/api/',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});


export const loadUser = (params) => dispatch => request.get('phonebooks', { params }).then(({ data }) => {
    dispatch({ type: 'LOAD_USER_SUCCESS', data, page: params.page })
}).catch((err) => {
    dispatch({ type: 'LOAD_USER_FAILED' })
})

export const addUser = ({ name, phone }) => dispatch => {
    return request.post('phonebooks', { name, phone }).then(({ data }) => {
        loadUser({ page: 1 })
    }).catch((err) => {
        console.log('error when adding user', err)
        dispatch({ type: 'ADD_USER_FAILED' })
    })
}

export const removeUser = (id) => dispatch => {
    return request.delete(`phonebooks/${id}`).then(({ data }) => {
        dispatch({ type: 'REMOVE_USER_SUCCESS', id: data.id })
    }).catch((err) => {
        console.log('error when removing user', err)
        dispatch({ type: 'REMOVE_USER_FAILED' })
    })
}

export const updateUser = ({ id, name, phone }) => dispatch => {
    return request.put(`phonebooks/${id}`, { name, phone }).then(({ data }) => {
        dispatch({ type: 'UPDATE_USER_SUCCESS', id, name, phone })
    }).catch((err) => {
        dispatch({ type: 'UPDATE_USER_FAILED' })
    })
}

export const updateAvatar = ({ id, avatar }) => dispatch => {
    return request.put(`phonebooks/${id}/avatar`, avatar, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(({ data }) => {
        dispatch({ type: 'UPDATE_AVATAR_SUCCESS', id, avatar: data.avatar })
    }).catch((err) => {
        console.log('err.message', err.message)
        dispatch({ type: 'UPDATE_AVATAR_FAILED' })
    })
}
