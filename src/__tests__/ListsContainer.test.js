import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import ReduxThunk from 'redux-thunk';
import { SETUP_ALL_TASKS } from '../Actions/types';
import { setUpAllTasks } from '../Actions';

describe('Lists container actions', () => {
    const mockStore = configureMockStore([ReduxThunk]);
    let store;
    beforeEach(() => {
        store = mockStore({
            todo: [],
            progress: [],
            done: []
        });
    });

    afterEach(() => {
        fetchMock.reset();
        fetchMock.restore();
    });

    it('sets up all 3 states', () => {
        fetchMock.getOnce('/tasks', {
            body: [
                {
                    id: 0,
                    type: 'todo',
                    task: 'do something'
                },
                {
                    id: 1,
                    type: 'progress',
                    task: 'doing something'
                },
                {
                    id: 2,
                    type: 'done',
                    task: 'done something'
                }
            ],
            headers: {
                'content-type': 'application/json'
            }
        });

        const expectedActions = [{
            type: SETUP_ALL_TASKS,
            payload: {
                todo: [{
                    id: 0,
                    type: 'todo',
                    task: 'todo task'
                }],
                progress: [{
                    id: 1,
                    type: 'progress',
                    task: 'progress task'
                }],
                done: [{
                    id: 2,
                    type: 'done',
                    task: 'done task'
                }]
            }
        }];

        return store.dispatch(setUpAllTasks()).then(() =>{
            expect(store.getActions().type).toEqual(expectedActions.type);
        });
    });
});