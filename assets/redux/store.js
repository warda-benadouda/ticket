import {applyMiddleware, configureStore , getDefaultMiddleware } from "@reduxjs/toolkit";
import { rootReducer, rootSaga } from "./rootreducer";
import createSagaMiddleware from 'redux-saga';
import {persistStore} from "redux-persist";


const sagaMiddleware = createSagaMiddleware();
const middleware = [
  ...getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,

  }),
  sagaMiddleware
];

const store = configureStore({
  reducer: rootReducer,
  middleware,

});


export const persistor = persistStore(store ,  middleware);

// sagaMiddleware.run(rootSaga);

export default store;