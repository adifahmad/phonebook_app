import axios from "axios"

export const loadUserFailed = () => ({
    type: 'LOAD_USER_FAILED'
})

export const loadUserSuccess = (data, page) => ({
    type: 'LOAD_USER_SUCCESS',
    data, page
})

export const loadUser = ({keyword, sortBy, sortMode, page}) => dispatch => axios.get('http://192.168.0.113:3001/api/phonebook', {params: {keyword, sortBy, sortMode, page}}).then(({ data }) => {      
        dispatch(loadUserSuccess(data, page))
}).catch((err) => {
    dispatch(loadUserFailed())
})

export const updateUserDraw = (allItem) => ({
    type: 'UPDATE_USER',
    allItem
})

export const updateAvatarDraw = (profile) => ({
    type: 'UPDATE_AVATAR',
    profile
})

export const addUserFailed = () => ({
    type: 'ADD_USER_FAILED'
})

export const addUserSuccess = (items) => ({
    type: 'ADD_USER_SUCCESS',
    items
})

export const addUserDraw = (items) => ({
    type: 'ADD_USER',
    items
})

export const addUser = ({id, name, phone}) => dispatch => {
    dispatch(addUserDraw({id, name, phone}))
    return axios.post('http://192.168.0.113:3001/api/phonebook', {id, name, phone}).then(({ data }) => {
        dispatch(addUserSuccess(data))
    }).catch((err) => {
        console.log(err)
        dispatch(addUserFailed())
    })
}

export const removeUser = (id) => dispatch => {
    return axios.delete(`http://192.168.0.113:3001/api/phonebook/${id}`).then(({ data }) => {
        dispatch({type: 'REMOVE_USER_SUCCESS', id})
    }).catch((err) => {
        dispatch({type: 'REMOVE_USER_FAILED'})
    })
}

export const updateUser = ({id, name, phone, avatar}) => dispatch => {
    dispatch(updateUserDraw())
    return axios.put(`http://192.168.0.113:3001/api/phonebook/${id}`, {name, phone, avatar}).then(({ data }) => {
        dispatch({type: 'UPDATE_USER_SUCCESS', id, name, phone, avatar})
    }).catch((err) => {
        dispatch({type: 'UPDATE_USER_FAILED'})
    })
}

export const updateAvatar = ({id, name, phone, avatar}) => dispatch => {
    dispatch(updateAvatarDraw())
    return axios.put(`http://192.168.0.113:3001/api/phonebook/${id}/avatar`, avatar, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    }).then(({ data }) => {
        dispatch({type: 'UPDATE_AVATAR_SUCCESS', id, name, phone, avatar})
    }).catch((err) => {
        console.log('err.message', err.message)
        dispatch({type: 'UPDATE_AVATAR_FAILED'})
    })
}
