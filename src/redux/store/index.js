import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers";

const initialState = {};

const middleware = [thunk];

// create Store
const store = createStore(
    rootReducer, // all combined reducers
    initialState, // DUHH initaial state at craete store level
    compose(
        applyMiddleware(...middleware)
    )
);

export default store;