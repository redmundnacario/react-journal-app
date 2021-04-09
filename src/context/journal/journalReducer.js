import {
    SET_JOURNALS,
    SET_JOURNAL,
    SET_LOADING,
    SET_MESSAGE,
    SET_ACTIVE_JOURNAL_ID
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
        case SET_LOADING:
            return{
                ...state,
                isLoading: true
            }
        case SET_ACTIVE_JOURNAL_ID:
            return{
                ...state,
                journal_id: action.payload
            }
        default:
            return state
    }
}

export default JournalReducer