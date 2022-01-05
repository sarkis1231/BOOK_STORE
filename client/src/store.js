import thunk from "redux-thunk";
import {applyMiddleware, createStore} from "redux";
import rootReducer from './reducers'

const {composeWithDevTools} = require("redux-devtools-extension");


const middleware= [thunk];

// TODO lock the DEV tool with the environment setup
export const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(...middleware)
));