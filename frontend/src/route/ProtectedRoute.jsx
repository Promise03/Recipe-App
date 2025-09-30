import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import React from 'react'

const ProtectedRoute = ({ allowedRoles}) => {
const {user} = useSelector((state) => state.auth)


if(!user) {
return <Navigate to="/login" replace />
}
if(!allowedRoles.includes(user.role)) {
return <Navigate to="/unauthorized" replace />
}
return <Outlet /> // Corrected line
}

export default ProtectedRoute