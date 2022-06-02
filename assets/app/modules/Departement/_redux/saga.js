import {put, takeLatest, call} from "redux-saga/effects";
import { actionTypes } from "./actionType";
import { actions } from "./actions";
import { getDepartements } from "./api";

export function* saga() {

    yield takeLatest(actionTypes.RequestDepartements, function* getDepartementsSaga({ payload: {  filter} }) {
        try {
         
            const departements = yield call( getDepartements , filter  );
            yield put(actions.setDepartements(departements));
        } 
        catch (error) {console.log(error);}
    });

}