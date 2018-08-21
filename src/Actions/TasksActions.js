import { API } from '../Constants';
import { SETUP_ALL_TASKS, ADD_TASK_SUCCESS, UPDATE_TASK, DELETE_TASK, MOVE_TASK } from './types';
import axios from 'axios';
import dataApi from '../dataApi';

export const setUpAllTasks = () => {
    return async(dispatch) =>{
        const res = await axios.get(API);
        const api = new dataApi(res.data);
        dispatch({
            type: SETUP_ALL_TASKS,
            payload: {
                todo: api.getTodo(),
                progress: api.getInProgress(),
                done: api.getDone()
            }
        });
    };
};

export const addTask = (type, task) =>{
    return async(dispatch) =>{
        
        const data = {
            id: uuidv4(),
            type,
            task
        };
        await axios.post(API, { ...data });
        dispatch({
            type: ADD_TASK_SUCCESS,
            data
        });
    };
};

export const updateTask = (task) =>{
    return async(dispatch) =>{
        await axios.put(`${API}/${task.id}`, {...task});
        dispatch({
            type: UPDATE_TASK,
            task
        });
    };
};

export const moveTask = (task, to) =>{
    return async(dispatch) =>{
        const type = task.type;
        task.type = to;
        await axios.put(`${API}/${task.id}`, {...task});
        dispatch({
            type: MOVE_TASK,
            task,
            from: type
        });
    };
};

export const deleteTask = (task) =>{
    return async(dispatch) =>{
        await axios.delete(`${API}/${task.id}`);
        dispatch({
            type: DELETE_TASK,
            task
        });
    };
};

//https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}