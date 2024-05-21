const initialState = {
    page: 1,
    limit: 10,
    pages: 2,
    total: 1,
    phonebooks: []
}

const users = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_USER_SUCCESS':
            if (action.page === 1)
                return { ...state, phonebooks: action.data.phonebooks }
            return { ...state, ...action.data, phonebooks: [...state.phonebooks, ...action.data.phonebooks] }

        case 'REMOVE_USER_SUCCESS':
            return { ...state, phonebooks: [...state.phonebooks.filter(item => item.id !== action.id)] }

        case 'UPDATE_USER_SUCCESS':
            return {
                ...state, phonebooks: [
                    ...state.phonebooks.map(item => {
                        if (item.id === action.id) {
                            item.name = action.name
                            item.phone = action.phone
                        }
                        return item
                    })
                ]
            }

        case 'UPDATE_AVATAR_SUCCESS':
            return {
                ...state, phonebooks: [
                    ...state.phonebooks.map(item => {
                        if (item.id === action.id) {
                            item.avatar = action.avatar
                        }
                        return item
                    })
                ]
            }

        case 'REMOVE_USER_FAILED':
        case 'LOAD_USER_FAILED':
        case 'ADD_USER_FAILED':
        default:
            return state;


    }
}

export default users