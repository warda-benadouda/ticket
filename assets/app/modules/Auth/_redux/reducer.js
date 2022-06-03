import { actionTypes } from "./Actiontype";
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
    user: undefined,
    authToken: undefined,
    all: [],
    originToken: undefined,
    isLoaded: true,
    errors: false,
};

export  const  reducer = persistReducer(
    { storage, key: "root", whitelist: ["authToken", "user","originToken"]}, 
    (state = initialState, action) => {
    switch (action.type) {
        case  actionTypes.Login: {

            const { authToken } = action.payload;
            const { user } = action.payload;

            return { authToken, user: user ?? undefined };
        }
        case actionTypes.UserLoaded: {

            const user = action.payload ;

            return { ...state, user : user };
        }

        default:
            return state
    }
}

);