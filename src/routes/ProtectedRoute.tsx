import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

export const ProtectedRoute = () => {
    const { token } = useAuth()
    const location = useLocation()

    return token ? (
            <Outlet />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    )
}