import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../component/login/Login';
import Register from '../component/register/Register';
import Home from '../component/home/Home';
import PrivateRoutes from './PrivateRoutes';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            <Route path="/" element={<PrivateRoutes component={<Home />} />} />
        </Routes>
    );
};

export default AppRoutes;