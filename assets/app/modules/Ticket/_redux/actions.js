import { actionTypes } from "./actionType";

export const actions = {

    requestSuperAdminTickets: (filter) => ({
        type: actionTypes.RequestSuperAdminTickets,
        payload: { filter},
    }),
    requestTickets: ( id , filter) => ({
        type: actionTypes.RequestTickets,
        payload: { id , filter},
    }),
    setTickets: (tickets) => ({
        type: actionTypes.SetTickets,
        payload: { tickets },
    }),
    requestTicket: ( id ) => ({
        type: actionTypes.RequestTicket,
        payload: { id },
    }),
    setTicket: (ticket) => ({
        type: actionTypes.SetTicket,
        payload: { ticket }
    }),
    deleteTicket: (ticket) => ({
        type: actionTypes.deleteTicket,
        payload: { ticket }
    }),
}