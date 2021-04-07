import {
    SET_TASKS,
    SET_TASK,
    SET_LOADING,
    SET_MESSAGE,
    CLEAR_MESSAGE
} from '../types'


const TaskReducer = (state, action) =>{
    switch(action.type){
        case SET_TASKS:
            return {
                ...state,
                tasks: action.payload,
                isLoading: false
            }
        case SET_TASK:
            return {
                ...state,
                task: action.payload,
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

export default TaskReducer