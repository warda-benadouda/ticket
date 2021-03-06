import { actionTypes } from "./actionType";

const initialState = {
    companies: [],
    item: null,
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.RequestCompanies: {
            return {
                ...state.companies,
            };
        }

        case actionTypes.setCompanies : {
            const { companies } = action.payload;
            return {
                ...state,
                companies : companies ,

            };
        }
        case actionTypes.RequestCompany: {
            return {
                ...state,
            };
        }
        case actionTypes.deleteCompany: {

            const { company} = action.payload;


            return {
                ...state,
                companies : state.companies.filter( c => c['@id'] !== company['@id'])
            };
        }
        default:
            return state;
    }
}
