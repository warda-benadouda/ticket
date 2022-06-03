import { actionTypes } from "./actionType";

export const actions = {

    requestUsers: ( filter) => ({
        type: actionTypes.RequestUsers,
        payload: { filter },
    }),
    setUsers: (users) => ({
        type: actionTypes.setUsers,
        payload: { users },
    }),
    requestUser: ( id ) => ({
        type: actionTypes.RequestUser,
        payload: { id },
    }),
    setUser: (user) => ({
        type: actionTypes.SetUser,
        payload: { user }
    }),
    deleteUser: (user) => ({
        type: actionTypes.deleteUser,
        payload: { user }
    }),
}