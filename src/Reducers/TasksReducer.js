import { SETUP_ALL_TASKS, ADD_TASK_SUCCESS, UPDATE_TASK, DELETE_TASK, MOVE_TASK } from '../Actions/types';

const INITIAL_STATE = {
    todo: [],
    progress: [],
    done: []
};

export default (state=INITIAL_STATE, action) =>{
    switch(action.type){
    case SETUP_ALL_TASKS:
        return {...state, ...action.payload };
    case ADD_TASK_SUCCESS:
        return {...state, [action.data.type]: [...state[action.data.type], action.data]};
    case UPDATE_TASK:
        return {...state, [action.task.type]: state[action.task.type].map(item => item.id === action.task.id ? {...item, task: action.task.task} : item)};
    case MOVE_TASK:
        return {
            ...state, 
            [action.from]: state[action.from].filter(task => task.type === action.from),
            [action.task.type]: [...state[action.task.type], action.task]
        };
    case DELETE_TASK:
        return {...state, [action.task.type]: state[action.task.type].filter(element => element !== action.task)};
    default:
        return state;
    }
};