import {put, takeLatest, call} from "redux-saga/effects";
import { actionTypes } from "./actionType";
import { actions } from "./actions";
import {
    getCompanies
} from "./api";

export function* saga() {

    yield takeLatest(actionTypes.RequestCompanies, function* getCompaniesSaga({ payload: {  filter} }) {
        try {
         
            const companies = yield call(getCompanies , filter  );
            yield put(actions.setCompanies(companies ));
        } 
        catch (error) {console.log(error);}
    });

}