import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';

configure({
    adapter: new Adapter()
});

describe('App component', () => {

    const AComponent = shallow(<App />);

    it('snapshor App component', () => {
        expect(AComponent).toMatchSnapshot();
    })
});