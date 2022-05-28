import { combineReducers } from "@reduxjs/toolkit";
import  { reducer as auth } from "../app/modules/Auth/_redux/reducer";


const appReducer = combineReducers({
    auth: auth,

  
  });

export const rootReducer = (state, action) => {

    // if (action.type === actionTypes.Logout) {
    //   window.localStorage.clear();
    //   return appReducer(undefined, action)
    // }

    return appReducer(state, action)
  }
  

export function* rootSaga() {

}