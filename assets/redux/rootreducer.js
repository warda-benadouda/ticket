import { combineReducers } from "@reduxjs/toolkit";
import  { reducer as auth } from "../app/modules/Auth/_redux/reducer";
import  { reducer as ticket } from "../app/modules/Ticket/_redux/reducer";
import {all} from "redux-saga/effects";

import  { saga  } from "../app/modules/Ticket/_redux/saga";


const appReducer = combineReducers({
    auth: auth,
    ticket : ticket

  
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
     saga(),

  ]);
}