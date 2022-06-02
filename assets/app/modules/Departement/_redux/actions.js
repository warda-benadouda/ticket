import { actionTypes } from "./actionType";

export const actions = {

    requestDepartements: ( filter) => ({
        type: actionTypes.RequestDepartements,
        payload: { filter },
    }),
    setDepartements: (departements) => ({
        type: actionTypes.setDepartements,
        payload: { departements },
    }),
    requestDepartement: ( id ) => ({
        type: actionTypes.RequestDepartement,
        payload: { id },
    }),
    setDepartement: (departement) => ({
        type: actionTypes.SetDepartement,
        payload: { departement}
    }),
    deleteDepartement: (departement) => ({
        type: actionTypes.deleteDepartement,
        payload: { departement }
    }),
}