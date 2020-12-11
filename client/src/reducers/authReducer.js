import {AUTH_TYPES} from "../actions/types";

const initialState = {
    isAuthenticated: false,
    user: {},
    loaded:false,
};

// eslint-disable-next-line
export default function (state = initialState, action) {
    switch (action.type) {
        case AUTH_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated:action.payload,
                user: action.payload
            };
        default:
            return state;
    }
}