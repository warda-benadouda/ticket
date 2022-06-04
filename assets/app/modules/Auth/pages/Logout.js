import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { actions } from '../_redux/actions';

function Logout() {

    const dispatch = useDispatch();

    useEffect (() => {

        dispatch(actions.logout());

        } , [])

  return (
    <Navigate to="/" replace />
  )
}

export default Logout