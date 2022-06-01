import {put, takeLatest, call} from "redux-saga/effects";
import { actionTypes } from "./actionType";
import { actions } from "./actions";
import {
    getTickets 
} from "./api";

export function* saga() {

    yield takeLatest(actionTypes.RequestTickets , function* getTicketsSaga({ payload: { id , filter} }) {
        try {
            const tickets = yield call(getTickets ,  id , filter);
            yield put(actions. setTickets(tickets ));
        } catch (error) {console.log(error);}
    });

}