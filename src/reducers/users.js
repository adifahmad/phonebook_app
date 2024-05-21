const users = (state = { phonebook: [] }, action) => {
    switch (action.type) {
        case 'LOAD_USER_SUCCESS':
            if (action.page === 1)
                return { phonebook: action.data.phonebook }
            return { ...state, ...action.data, phonebook: [...state.phonebook, ...action.data.phonebook] }

        case 'REMOVE_USER_SUCCESS':
            return { ...state, phonebook: [...state.phonebook.filter(item => item.id !== action.id)] }

        case 'UPDATE_USER_SUCCESS':
              return {...state, phonebook: [...state.phonebook.map(data => data.id === action.id
                          ? { id: action.id, name: action.name, phone: action.phone, avatar: action.avatar }
                          : data
                  )]
              };           
        case 'UPDATE_AVATAR_SUCCESS':
            return { ...state, phonebook: [...state.phonebook.filter(data => data.id !== action.id), { id: action.id, name: action.name, phone: action.phone, avatar: action.avatar._parts[0][1].name }] }
            
        case 'REMOVE_USER_FAILED':
        case 'LOAD_USER_FAILED':
        default:
            return state;


    }
}

export default users