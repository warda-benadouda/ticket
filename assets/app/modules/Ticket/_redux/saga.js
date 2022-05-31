import {put, takeLatest, call} from "redux-saga/effects";
import { actionTypes } from "./actionType";
import { actions } from "./actions";
import {
    getAdminTickets , getSuperAdminTickets, getTicket 
} from "./api";

export function* saga() {

    yield takeLatest(actionTypes.RequestTickets , function* getTicketsSaga({ payload: { id , filter} }) {
        try {
            const tickets = yield call(getAdminTickets ,  id , filter);
            yield put(actions. setTickets(tickets ));
        } catch (error) {
            console.log(error);
            // yield put(actions.Failed(error.response));
        }
    });

    yield takeLatest(actionTypes.RequestSuperAdminTickets , function* getSuperAdminTicketsSaga({ payload: {filter} }) {
        try {

            const tickets = yield call(getSuperAdminTickets ,  filter);           
            yield put(actions. setTickets(tickets ));
        } catch (error) {
            console.log(error);
            // yield put(actions.Failed(error.response));
        }
    });

    // yield takeLatest(actionTypes.CampaignRequested, function* getTicketSaga({ payload: { id } }) {
    //     try {

    //         let ticket = yield call(getTicket,id);
    //         yield put(actions.setTicket(ticket));
    //     } catch (error) {
    //         console.log(error);
    //         // yield put(actions.setCampaignFailed(error));
    //     }
    // });
}