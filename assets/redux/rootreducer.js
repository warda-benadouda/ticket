import { combineReducers } from "@reduxjs/toolkit";
import  { reducer as auth } from "../app/modules/Auth/_redux/reducer";
import  { reducer as ticket } from "../app/modules/Ticket/_redux/reducer";
import  { reducer as company} from "../app/modules/Company/_redux/reducer";
import {all} from "redux-saga/effects";

import  { saga  as ticketSaga} from "../app/modules/Ticket/_redux/saga";
import  { saga  as CompanySaga} from "../app/modules/Company/_redux/saga";


const appReducer = combineReducers({
    auth: auth,
    ticket : ticket ,
    company : company ,

  
  });

export const rootReducer = (state, action) => {

    // if (action.type === actionTypes.Logout) {
    //   window.localStorage.clear();
    //   return appReducer(undefined, action)
    // }

    return appReducer(state, action)
  }
  

export function* rootSaga() {
  yield all([
    ticketSaga(),
    CompanySaga()

  ]);
}