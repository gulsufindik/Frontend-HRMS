import { Outlet } from "react-router";
import { Navigate } from "react-router";

export function ProtectedRoute(){
    // const isLoggedIn = false;

    const token = localStorage.getItem("token");
    return token ? <Outlet/> : <Navigate to="/"/>
}