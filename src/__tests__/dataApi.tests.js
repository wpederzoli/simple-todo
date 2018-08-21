import dataApi from '../dataApi';
import { tasks } from '../../db.json';

describe('dataApi', () =>{
    const api = new dataApi(tasks);

    it('should return todo tasks', () =>{
        const filterTodo = (arr) =>{
            return arr.type === 'todo';
        };
        expect(api.getTodo()).toEqual(tasks.filter(filterTodo));
    });

    it('should return in progress tasks', () =>{
        const filterProgress = (arr) =>{
            return arr.type === 'progress';
        };
        expect(api.getInProgress()).toEqual(tasks.filter(filterProgress));    });

    it('should return done tasks', () =>{
        const filterDone = (arr) =>{
            return arr.type === 'done';
        };
        expect(api.getDone()).toEqual(tasks.filter(filterDone));    });
});