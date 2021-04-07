import {
    SET_JOURNALS,
    SET_JOURNAL,
    SET_LOADING,
    SET_MESSAGE,
    CLEAR_MESSAGE
} from '../types'


const JournalReducer = (state, action) =>{
    switch(action.type){
        case SET_JOURNALS:
            return {
                ...state,
                journals: action.payload,
                isLoading: false
            }
        case SET_JOURNAL:
            return {
                ...state,
                journal: action.payload,
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
        default:
            return state
    }
}

export default JournalReducer