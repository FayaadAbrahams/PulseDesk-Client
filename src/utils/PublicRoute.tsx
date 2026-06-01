import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import * as React from 'react'

interface PublicRouteProps {
    children: React.ReactNode
}

const PublicRoute = ({ children }: PublicRouteProps) => {
    const { user } = useAuth()

    // If already logged in, redirect away from login/register
    if (user) return <Navigate to="/dashboard" replace />

    return children
}

export default PublicRoute