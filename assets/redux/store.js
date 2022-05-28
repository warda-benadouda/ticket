import {applyMiddleware, configureStore } from "@reduxjs/toolkit";
import { rootReducer, rootSaga } from "./rootreducer";
import createSagaMiddleware from 'redux-saga';


const sagaMiddleware = createSagaMiddleware();
const middleware = applyMiddleware(sagaMiddleware);

const store = configureStore({
    reducer: rootReducer,
    // middleware,

});

// sagaMiddleware.run(rootSaga);
export default store;