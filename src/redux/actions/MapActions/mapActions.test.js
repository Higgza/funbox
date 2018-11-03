import {
    ADD_ADRESS,
    ADD_MAP_ARRAY,
    CHANGE_ADDRESS_INFO,
    CHANGE_LIST_ARRAY,
    CHANGE_ROUTE_LIST_ARRAY,
    DELETE_ROUTE_LIST
} from "../typeActions";
import {addAdress, addMapArray, asyncChangeOnMap, cArray, changeInfo, changeOnMap, deleteRouteList} from "./mapActions";

describe('UNIT Tests MapActions', () => {

    it('ADD_ADRESS', () => {
        const label = {
            description: 'string'
        };

        expect(addAdress(label)).toEqual({
            type: ADD_ADRESS,
            newInfo: label.description
        });
    });

    it('ADD_ADRESS - undefined, "", null', () => {
        const label = {
            description: ''
        };

        expect(addAdress(label)).toEqual({
            type: ADD_ADRESS,
            newInfo: ''
        });
    });

    it('ADD_MAP_ARRAY', () => {
        const label = 'string';

        expect(addMapArray(label)).toEqual({
            type: ADD_MAP_ARRAY,
            mapArrayName: label
        });
    });

    it('ADD_MAP_ARRAY - DEFAULT', () => {
        const label = null;

        expect(addMapArray(label)).toEqual({
            type: 'DEFAULT'
        });
    });

    it('CHANGE_ADDRESS_INFO', () => {
        const address = 'address';
        const arr = [1,2,3];

        expect(changeInfo(address, arr)).toEqual({
            type: CHANGE_ADDRESS_INFO,
            address,
            arr
        });
    });

    it('CHANGE_LIST_ARRAY', () => {
        const obj = {};

        expect(cArray(obj)).toEqual({
            type: CHANGE_LIST_ARRAY,
            obj
        });
    });

    it('DELETE_ROUTE_LIST', () => {
        const obj = {};

        expect(deleteRouteList(obj)).toEqual({
            type: DELETE_ROUTE_LIST,
            obj
        });
    });

    it('CHANGE_ROUTE_LIST_ARRAY', () => {
        const obj = {};

        expect(changeOnMap(obj)).toEqual({
            type: CHANGE_ROUTE_LIST_ARRAY,
            obj
        });
    });

    it('asyncChangeOnMap', () => {
        const obj = {};
        const mock = jest.fn((obj) => {
            return obj
        });
        asyncChangeOnMap(mock(obj));
        expect(mock).toHaveBeenCalled();
    });

});