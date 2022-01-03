import jwt_decode from "jwt-decode";
import {AUTH_TYPES} from "./types";
import {setAuthToken} from "../utils/redux";



//TODO checking right typing for the files

export const setCurrentUser = function (decoded) {
    return {
        type: AUTH_TYPES.SET_CURRENT_USER,
        payload: decoded
    };
};


export const loginUser = (userData) => (dispatch) => {
    const {token} = userData.data;

    //creating the token in ls
    localStorage.setItem('token', token); //TODO Replace it with unique shit

    //set Token to Auth Header
    setAuthToken(token);

    //decode the token
    const decoded = jwt_decode(token);

    dispatch(setCurrentUser(decoded));
};


export const logOutUser = () => (dispatch) => {

    if (localStorage.token) {
        localStorage.removeItem('token');
    }
    setAuthToken();
    dispatch(setCurrentUser({}));
};
