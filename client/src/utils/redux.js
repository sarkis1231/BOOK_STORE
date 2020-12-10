import axios from "axios"

//redux utility functions

export function setAuthToken(token) {
    if (token) {
        axios.defaults.headers.common['Authorization'] = token;
        return;
    }
    delete axios.defaults.headers.common['Authorization'];
}
