import {
    SET_TASKS,
    SET_TASKS_TODAY,
    SET_TASK,
    SET_LOADING,
    SET_MESSAGE,
    SET_ACTIVE_TASK_ID
} from '../types'


const TaskReducer = (state, action) =>{
    switch(action.type){
        case SET_TASKS:
            return {
                ...state,
                tasks: action.payload,
                isLoading: false
            }
        case SET_TASKS_TODAY:
            return {
                ...state,
                tasks_today: action.payload
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
        case SET_LOADING:
            return{
                ...state,
                isLoading: true
            }
        case SET_ACTIVE_TASK_ID:
            return {
                ...state,
                task_id: action.payload
            }
        default:
            return state
    }
}

export default TaskReducer