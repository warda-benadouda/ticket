import { actionTypes } from "./Actiontype";

const initialState = {
    user: undefined,
    authToken: undefined,
    all: [],
    originToken: undefined,
    isLoaded: true,
    errors: false,
};

export function reducer(state = initialState, action) {
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