import {put, takeLatest, call} from "redux-saga/effects";
import { actionTypes } from "./actionType";
import { actions } from "./actions";
import { getUsers } from "./api";


export function* saga() {

    yield takeLatest(actionTypes.RequestUsers , function* getUsersSaga({ payload: {  filter} }) {
        try {
         
            const users = yield call(getUsers, filter  );
            yield put(actions.setUsers(users));
        } 
        catch (error) {console.log(error);}
    });

}