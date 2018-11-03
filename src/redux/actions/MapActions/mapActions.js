import {
    ADD_ADRESS,
    ADD_MAP_ARRAY,
    CHANGE_ADDRESS_INFO,
    CHANGE_LIST_ARRAY,
    CHANGE_ROUTE_LIST_ARRAY,
    DELETE_ROUTE_LIST
} from "../typeActions";

export function addAdress(label) {
    if(label === undefined || label === null || label === '') {
        return {
            type: 'DEFAULT',
            newInfo: ''
        }
    }
    return {
        type: ADD_ADRESS,
        newInfo: label.description
    }
}

export function addMapArray(label) {
    if(label === undefined || label === null) {
        return {
            type: 'DEFAULT'
        }
    }
    return {
        type: ADD_MAP_ARRAY,
        mapArrayName: label
    }
}

export function changeInfo(address, arr) {
    return {
        type: CHANGE_ADDRESS_INFO,
        address,
        arr
    }
}


/*
* Работа с маршрутом
* */

export function cArray(obj) {
    return {
        type: CHANGE_LIST_ARRAY,
        obj
    }
}

export function deleteRouteList(obj) {
    return {
        type: DELETE_ROUTE_LIST,
        obj
    }
}

export function changeOnMap(obj) {
    return {
        type: CHANGE_ROUTE_LIST_ARRAY,
        obj
    }
}

export function asyncChangeOnMap(obj) {
    return (dispatch) => {
        dispatch(changeOnMap(obj));
    }
}