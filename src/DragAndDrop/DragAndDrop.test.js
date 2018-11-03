import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {DragAndDrop} from './DragAndDrop';

configure({
    adapter: new Adapter()
});

describe('Shallow test DragAndDrop.js', () => {

    const props = {
        ddMapArray: [],
        onCArray: jest.fn(),
        onDeteleArrayRoute: jest.fn()
    };

    describe('initial component DragAndDrop', () => {

        const DDComponent = shallow(<DragAndDrop {...props} />);

        it('snapshot test', () => {
            expect(DDComponent).toMatchSnapshot();
        });
    });

    describe('1 length array component DragAndDrop', () => {
        const nextProps = {
            ...props,
            ddMapArray: [
                {name: 'One Name'}
            ]
        };

        const DDComponent = shallow(<DragAndDrop {...nextProps} />);

        it('snapshot test', () => {
            expect(DDComponent).toMatchSnapshot();
        });

        it('list functions test DragAndDrop', () => {
            DDComponent.find('div.testClassName2 > ul > li > i').simulate('click');
            expect(nextProps.onDeteleArrayRoute).toHaveBeenCalled();
        });
    });

    describe('props test component DragAndDrop', () => {
        const nextProps = {
            ...props,
            ddMapArray: [
                {name: 'One Name'},
                {name: 'Two Name'},
                {name: 'Three Name'}
            ]
        };

        const DDComponent = shallow(<DragAndDrop {...nextProps} />);

        it('snapshot test DragAndDrop', () => {
            expect(DDComponent).toMatchSnapshot();
        });

        it('list test DragLeave -- DragAndDrop', () => {
            DDComponent.find('div.testClassName1 > ul > li').first().simulate('DragLeave', {
                target: {
                    style: {
                        border: '1px solid #dbdbdb'
                    }
                }
            });
            expect(DDComponent.state('memory')).toEqual({
                index: 0,
                name: nextProps.ddMapArray[0].name
            });
        });

        it('list test DragEnd -- DragAndDrop', () => {
            DDComponent.find('div.testClassName1 > ul > li').first().simulate('DragEnd');
            expect(props.onCArray).toHaveBeenCalled();
        });
    });
});