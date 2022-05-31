import { actionTypes } from "./actionType";

const initialState = {
    tickets: [],
    item: null,
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.RequestTickets: {
            return {
                ...state.tickets,
                errors: false,
            };
        }

        case actionTypes.SetTickets: {
            const { tickets } = action.payload;
            let all = ('hydra:member' in tickets) ? tickets["hydra:member"] : tickets;

            return {
                ...state,
                tickets : all ,

            };
        }
        default:
            return state;
    }
}


//request tickets 
//get one ticket 
//update a ticket
//delete a ticket 