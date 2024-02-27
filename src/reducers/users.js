const users = (state = { phonebook: [] }, action) => {
    switch (action.type) {
        case 'LOAD_USER_SUCCESS':
            if (action.page === 1)
                return { phonebook: action.data.phonebook }
            return { ...state, ...action.data, phonebook: [...state.phonebook, ...action.data.phonebook] }

        case 'ADD_USER':
            const add = { ...state, phonebook: [...state.phonebook, action.items] }
            add.phonebook.sort((a, b) => b.id - a.id)
            return add

        case 'REMOVE_USER_SUCCESS':
            return { ...state, phonebook: [...state.phonebook.filter(item => item.id !== action.id)] }

        case 'UPDATE_USER_SUCCESS':
            const sortBy = { ...state, phonebook: [...state.phonebook.filter(data => data.id !== action.id), { id: action.id, name: action.name, phone: action.phone, avatar: action.avatar }] }
            sortBy.phonebook.sort((a, b) => b.id - a.id)
            return sortBy

        case 'UPDATE_AVATAR_SUCCESS':
            const sortByAvatar = { ...state, phonebook: [...state.phonebook.filter(data => data.id !== action.id), { id: action.id, name: action.name, phone: action.phone, avatar: action.avatar._parts[0][1].name }] }
            sortByAvatar.phonebook.sort((a,b) => b.id - a.id)
            return sortByAvatar

        case 'REMOVE_USER_FAILED':
        case 'LOAD_USER_FAILED':
        default:
            return state;


    }
}

export default users