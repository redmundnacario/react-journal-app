import {
    SET_USER,
    CLEAR_USER,
    SET_LOADING,
    SET_MESSAGE,
    CLEAR_MESSAGE
} from '../types'

const UserReducer = (state, action) =>{
    switch(action.type){
        case SET_USER:
            return {
                ...state,
                user: action.payload,
                isLoading: false
            }
        case CLEAR_USER:
            return {
                ...state,
                user: {},
                isLoading: false
            }
        case SET_MESSAGE:
            return {
                ...state,
                message: action.payload,
                isLoading: false
            }
        case CLEAR_MESSAGE:
            return {
                ...state,
                message: {},
                isLoading: false
            }
        case SET_LOADING:
            return{
                ...state,
                isLoading: true
            }
        default :
            return state;
    }
}

export default UserReducer