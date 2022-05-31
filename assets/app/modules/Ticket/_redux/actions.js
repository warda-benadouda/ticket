import { actionTypes } from "./actionType";

export const actions = {

    requestTickets: (filter) => ({
        type: actionTypes.RequestTickets,
        payload: { filter},
    }),
    setTickets: (tickets) => ({
        type: actionTypes.SetTickets,
        payload: { tickets },
    }),
}