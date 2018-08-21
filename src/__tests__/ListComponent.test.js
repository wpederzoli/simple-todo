import React from 'react';
import { shallow } from 'enzyme';
import ListComponent from '../Components/ListComponent';

describe('List Component', () =>{
    describe('rendering', () =>{
        const props = {
            data: [{ id: 0, type: 'todo', task: 'do something' }, { id: 1, type: 'todo', task: 'do something else'} ],
            onClick: jest.fn()
        };

        const wrapper = shallow(<ListComponent {...props} />);

        it('shows a list of received props', () =>{
            expect(wrapper.find('h3').length).toEqual(props.data.length);
        });

        it('has a delete item button', () =>{
            expect(wrapper.exists('pure(DeleteForever)')).toBeTruthy();
        });
        
        it('has a in progress button', () =>{
            expect(wrapper.exists('pure(Alarm)')).toBeTruthy();
        });

        it('has a done button', () =>{
            expect(wrapper.exists('pure(Done)')).toBeTruthy();
        });

        it('has an add to list button', () =>{
            expect(wrapper.exists('pure(AddCircle)')).toBeTruthy();
        });
    });

    describe('behaviour ', () =>{
        let wrapper, props;
        beforeEach(() =>{
            props = {
                data: [{ id: 0, task: 'do something' }, { id: 1, task: 'do something else'} ],
                onClick: jest.fn()
            };
            wrapper = shallow(<ListComponent {...props} />);
            wrapper.find('#add_task').prop('onClick')();
        });
        it('should call on click function', () =>{
            expect(props.onClick).toHaveBeenCalledTimes(1);
        });
    });
});