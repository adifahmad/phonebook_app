import axios from "axios"
const contact = 'http://192.168.1.42:3001/api/phonebook'


export const loadUser = (params) => dispatch => axios.get('http://192.168.1.42:3001/api/phonebook', { params }).then(({ data }) => {
    dispatch({type: 'LOAD_USER_SUCCESS',data, page: params.page })
}).catch((err) => {
    dispatch({ type: 'LOAD_USER_FAILED' })
})

export const addUser = ({ name, phone }) => dispatch => {
    return axios.post('http://192.168.1.42:3001/api/phonebook', { name, phone }).then(({ data }) => {
        dispatch(loadUser({ page: 1 }))
    }).catch((err) => {
        console.log('gagal', err)
        dispatch({ type: 'LOAD_USER_FAILED' })
    })
}

export const removeUser = (id) => dispatch => {
    return axios.delete(`http://192.168.1.42:3001/api/phonebook/${id}`).then(({ data }) => {
        dispatch({ type: 'REMOVE_USER_SUCCESS', id })
    }).catch((err) => {
        dispatch({ type: 'REMOVE_USER_FAILED' })
    })
}

export const updateUser = ({ id, name, phone }) => dispatch => {
    console.log('params', id, name, phone)
    return axios.put(`http://192.168.1.42:3001/api/phonebook/${id}`, { name, phone }).then(({ data }) => {
        dispatch({ type: 'UPDATE_USER_SUCCESS', name, phone, avatar })
    }).catch((err) => {
        dispatch({ type: 'UPDATE_USER_FAILED' })
    })
}

export const updateAvatar = ({ id, name, phone, avatar }) => dispatch => {
    return axios.put(`http://192.168.1.42:3001/api/phonebook/${id}/avatar`, avatar, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(({ data }) => {
        dispatch({ type: 'UPDATE_AVATAR_SUCCESS', id, name, phone, avatar })
    }).catch((err) => {
        console.log('err.message', err.message)
        dispatch({ type: 'UPDATE_AVATAR_FAILED' })
    })
}
