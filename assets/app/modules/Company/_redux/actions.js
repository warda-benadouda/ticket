import { actionTypes } from "./actionType";

export const actions = {

    requestCompanies: ( filter) => ({
        type: actionTypes.RequestCompanies,
        payload: { filter },
    }),
    setCompanies: (companies) => ({
        type: actionTypes.setCompanies,
        payload: { companies },
    }),
    requestCompany: ( id ) => ({
        type: actionTypes.RequestCompany,
        payload: { id },
    }),
    setCompany: (company) => ({
        type: actionTypes.SetCompany,
        payload: { company }
    }),
    deleteCompany: (company) => ({
        type: actionTypes.deleteCompany,
        payload: { company }
    }),
}