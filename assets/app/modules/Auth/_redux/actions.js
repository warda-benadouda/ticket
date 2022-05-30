import { actionTypes } from "./Actiontype";

export const actions = {

    login: (authToken) => ({ 
        type: actionTypes.Login, 
        payload: { authToken } 
    }),
    loadUser: (user) => ({ 
        type: actionTypes.UserLoaded,
        payload: { user } 
    }),
}