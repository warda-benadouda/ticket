import { actionTypes } from "./actionType";

const initialState = {
    departements: [],
    item: null,
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.RequestDepartements: {
            return {
                ...state.departements,
            };
        }

        case actionTypes.setDepartements : {
            const { departements } = action.payload;
            return {
                ...state,
                departements : departements ,

            };
        }
        case actionTypes.RequestDepartement: {
            return {
                ...state,
            };
        }
        case actionTypes.deleteDepartement: {

            const { departement } = action.payload;


            return {
                ...state,
                departements : state.departements.filter( c => c['@id'] !== departement['@id'])
            };
        }
        default:
            return state;
    }
}
