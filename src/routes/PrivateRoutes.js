import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../component/load/Loading';
import { Navigate, Route, Routes } from 'react-router-dom';
import { fechUserToken } from '../redux/userSlice';

const PrivateRoutes = (props) => {

    const dispatch = useDispatch();
    const dataredux = useSelector((state) => state.userisaccess)

    useEffect(() => {
        if (window.location.pathname !== '/login' || window.location.pathname !== '/register')
            dispatch(fechUserToken())
    }, [])


    if (dataredux.isLoading === true) {
        return (
            <Loading />
        )
    } else {
        if (dataredux && dataredux.isAuthenticated === true) {
            return (
                <Routes>
                    <Route path="/" element={props.component} />
                </Routes>
            );
        }
        else {
            return <Navigate to="/login" replace />
        }
    }
};

export default PrivateRoutes;