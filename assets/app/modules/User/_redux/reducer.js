import { actionTypes } from "./actionType";

const initialState = {
    users: [],
    item: null,
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.RequestUsers: {
            return {
                ...state.users,
            };
        }

        case actionTypes.setUsers : {
            const { users } = action.payload;
            return {
                ...state,
                users : users ,

            };
        }
        case actionTypes.RequestUser: {
            return {
                ...state,
            };
        }
        case actionTypes.deleteUser: {

            const { user} = action.payload;


            return {
                ...state,
                users : state.users.filter( c => c['@id'] !== user['@id'])
            };
        }
        default:
            return state;
    }
}
