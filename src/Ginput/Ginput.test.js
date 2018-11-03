import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Gimput} from './Ginput';

configure({
    adapter: new Adapter()
});

describe('Ginput component', () => {

    const props = {
        mapInfo: '',
        onaddAdress: jest.fn(),
        onAddMapArray: jest.fn(),
        location: jest.fn(),
    };

    describe('Initial Ginput component', () => {

        const initialProps = {
            ...props
        };

        const GComponent = shallow(<Gimput {...initialProps}  />);

        it('snapshot initial Ginput component', () => {
            expect(GComponent).toMatchSnapshot();
        });

        it('disabled button Gunput', () => {
            expect(GComponent.find('button').prop('disabled')).toBeTruthy();
        });
    });

    describe('Props Ginput component', () => {

        const nextProps = {
            ...props,
            mapInfo: 'string'
        };

        const GComponent = shallow(<Gimput {...nextProps}  />);

        it('snapshot Props Ginput component', () => {
            expect(GComponent).toMatchSnapshot();
        });

        it('button desabled test', () => {
            expect(GComponent.find('button').prop('disabled')).toBeFalsy();
        });

        /*
        it('button onClick test', () => {
            GComponent.find('button').simulate('click');
            expect(nextProps.onAddMapArray()).toHaveBeenCalled();
        });*/

    });

});