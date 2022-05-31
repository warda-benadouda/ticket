import {put, takeLatest, call} from "redux-saga/effects";
import { actionTypes } from "./actionType";
import { actions } from "./actions";
import {
    getAdminTickets
} from "./api";

export function* saga() {

    yield takeLatest(actionTypes.RequestTickets , function* getTicketsSaga({ payload: {filter} }) {
        try {
            const tickets = yield call(getAdminTickets ,  filter);
            console.log(tickets , "tickets saga ");
            
            yield put(actions. setTickets(tickets ));
        } catch (error) {
            console.log(error);
            // yield put(actions.quizRequestAllFailed(error.response));
        }
    });
}