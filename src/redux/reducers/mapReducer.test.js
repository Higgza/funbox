import googleMap from "./mapReducer";
import {
    ADD_ADRESS,
    ADD_MAP_ARRAY, CHANGE_ADDRESS_INFO,
    CHANGE_LIST_ARRAY,
    CHANGE_ROUTE_LIST_ARRAY,
    DELETE_ROUTE_LIST
} from "../actions/typeActions";

describe('UNIT Tests MapReducer.js', () => {

    const state = {
        info: '',
        arr: [],
        directions: {}
    };

    it('ADD_ADRESS Reducer', () => {
        const action = {
            type: ADD_ADRESS,
            newInfo: 'string'
        };

        expect(googleMap(state, action)).toEqual({
            ...state,
            info: action.newInfo
        });
    });

    it('ADD_MAP_ARRAY Reducer - non undefined', () => {
        const action = {
            type: ADD_MAP_ARRAY,
            mapArrayName: 'string'
        };

        expect(googleMap(state, action)).toEqual({
            ...state,
            arr: [
                ...state.arr,
                {name: action.mapArrayName}
            ]
        });
    });

    it('ADD_MAP_ARRAY Reducer - undefined', () => {
        const action = {
            type: ADD_MAP_ARRAY,
            mapArrayName: undefined
        };

        expect(googleMap(state, action)).toEqual({
            ...state
        });
    });

    it('ADD_MAP_ARRAY Reducer - ""', () => {
        const action = {
            type: ADD_MAP_ARRAY,
            mapArrayName: ''
        };

        expect(googleMap(state, action)).toEqual({
            ...state
        });
    });

    it('CHANGE_LIST_ARRAY Reducer', () => {
        const action = {
            type: CHANGE_LIST_ARRAY,
            obj: {name: 'string'}
        };

        expect(googleMap(state, action)).toEqual({
            ...state,
            arr: action.obj
        });
    });

    it('DELETE_ROUTE_LIST Reducer', () => {
        const action = {
            type: DELETE_ROUTE_LIST,
            obj: []
        };

        expect(googleMap(state, action)).toEqual({
            ...state,
            arr: action.obj
        });
    });

    it('CHANGE_ROUTE_LIST_ARRAY Reducer', () => {
        const action = {
            type: CHANGE_ROUTE_LIST_ARRAY,
            obj: []
        };

        expect(googleMap(state, action)).toEqual({
            ...state,
            arr: action.obj
        });
    });

    it('CHANGE_ADDRESS_INFO Reducer', () => {
        const action = {
            type: CHANGE_ADDRESS_INFO,
            address: 'string',
            arr: []
        };

        expect(googleMap(state, action)).toEqual({
            ...state,
            info: action.address,
            arr: action.arr
        });
    });

    it('Default Reducer', () => {
        const action = {
            type: 'BLA_BLA_ACTION'
        };

        expect(googleMap(state, action)).toEqual({
            ...state
        });
    });



});