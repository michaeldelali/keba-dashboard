import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { DefinedRoutes } from "../routes";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    console.log(`auth: ${JSON.stringify(auth)}`);
    console.log(`auth: ${JSON.stringify(auth.email)}`);
    const location = useLocation();

    return (
        auth?.roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : auth?.email
                ? <Navigate to={DefinedRoutes.Unauthorized.path} state={{ from: location }} replace />
                : <Navigate to={DefinedRoutes.Signin.path} state={{ from: location }} replace />
    );
}

export default RequireAuth;