
export default (state, action) => {
    switch(action.type){
        case 'REGISTER_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
            }
            case 'REGISTER_FAILURE':
                localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isLoading: false,
                isAuthenticated: false,
                user: null
            }
        default: 
            return state;
    }
}