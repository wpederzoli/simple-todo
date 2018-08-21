import React from 'react';
import { shallow } from 'enzyme';
import App from '../Components/App';

describe('App component', () =>{
    const wrapper = shallow(<App />);

    it('should have a title', () =>{
        expect(wrapper.find('h2').text()).toEqual('SIMPLE TO DO APP');
    });

    it('should have a child container component', () =>{

        expect(wrapper.exists('Connect(ListsContainer)')).toBeTruthy();
    });
});