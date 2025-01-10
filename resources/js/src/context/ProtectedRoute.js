// ProtectedRoute.js
import React from "react";
import { Route, Navigate, Routes } from 'react-router-dom';
import { useAuth } from "./authContext";
// import ApiHook from "../components/CustomHooks/ApiHook";

const ProtectedRoute = ({ element: Element, ...rest }) => {
    const { authed } = useAuth();
    // const [currentLanguage] = ApiHook();

    return (
        <Routes>
            <Route
                {...rest}
                element={authed ? <Element /> : <Navigate to="/" />}
            />
        </Routes>
    );
}

export default ProtectedRoute;
