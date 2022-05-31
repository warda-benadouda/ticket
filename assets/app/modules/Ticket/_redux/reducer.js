import { actionTypes } from "./actionType";

const initialState = {
    tickets: [],
    item: null,
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.RequestSuperAdminTickets: {
            return {
                ...state.tickets,
            };
        }

        case actionTypes.RequestTickets: {
            return {
                ...state.tickets,
            };
        }

        case actionTypes.SetTickets: {
            const { tickets } = action.payload;
            return {
                ...state,
                tickets : tickets ,

            };
        }
        case actionTypes.RequestTicket: {
            return {
                ...state,
            };
        }
        default:
            return state;
    }
}
