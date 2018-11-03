import {
    ADD_ADRESS,
    ADD_MAP_ARRAY, CHANGE_ADDRESS_INFO,
    CHANGE_LIST_ARRAY,
    CHANGE_ROUTE_LIST_ARRAY,
    DELETE_ROUTE_LIST
} from "../actions/typeActions";

const initialState = {
    info: '',
    arr: [],
    directions: {},
};

export default function googleMap(state = initialState, action) {
    switch (action.type) {
        case ADD_ADRESS:
            return {
                ...state,
                info: action.newInfo
            };
        case ADD_MAP_ARRAY:
            if (action.mapArrayName === undefined || action.mapArrayName === '') {
                return state;
            } else {
                return {
                    ...state,
                    arr: [
                        ...state.arr,
                        {name: action.mapArrayName}
                    ]
                };
            }
        case CHANGE_LIST_ARRAY:
            return {
                ...state,
                arr: action.obj
            };
        case DELETE_ROUTE_LIST:
            return {
                ...state,
                arr: action.obj
            };
        case CHANGE_ROUTE_LIST_ARRAY:
            return {
                ...state,
                arr: action.obj
            };
        case CHANGE_ADDRESS_INFO:
            return {
                ...state,
                info: action.address,
                arr: action.arr
            };
        default:
            return state;
    }
}