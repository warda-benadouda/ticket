import { combineReducers } from "@reduxjs/toolkit";
import {all} from "redux-saga/effects";

import  { reducer as auth } from "../app/modules/Auth/_redux/reducer";
import  { reducer as ticket } from "../app/modules/Ticket/_redux/reducer";
import  { reducer as company} from "../app/modules/Company/_redux/reducer";
import  { reducer as departement} from "../app/modules/Departement/_redux/reducer";
import  { reducer as user} from "../app/modules/User/_redux/reducer";


import  { saga  as ticketSaga} from "../app/modules/Ticket/_redux/saga";
import  { saga  as CompanySaga} from "../app/modules/Company/_redux/saga";
import  { saga  as DepartementSaga} from "../app/modules/Departement/_redux/saga.js";
import  { saga  as UserSaga} from "../app/modules/User/_redux/saga.js";
import { actionTypes } from "../app/modules/Auth/_redux/Actiontype";


const appReducer = combineReducers({
    auth: auth,
    ticket : ticket ,
    company : company ,
    departement : departement,
    user : user
  });

export const rootReducer = (state, action) => {

    if (action.type === actionTypes.Logout) {
      window.localStorage.clear();
      return appReducer(undefined, action)
    }

    return appReducer(state, action)
  }
  

export function* rootSaga() {
  yield all([
    ticketSaga(),
    CompanySaga(),
    DepartementSaga(),
    UserSaga()

  ]);
}