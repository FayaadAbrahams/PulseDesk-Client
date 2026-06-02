import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Tickets from "./pages/Tickets";
import TicketDetail from "./pages/TicketDetail";
import { Toaster } from "./components/ui/sonner";
import PublicRoute from "./utils/PublicRoute";
import Layout from "./components/Layout";
import Users from "./pages/Users";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster theme="dark" />
        <Routes>
          {/* Public routes */}

          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="/register" element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } />

          {/* Protected routes */}
          <Route element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/tickets/:id" element={<TicketDetail />} />
            <Route path="/Users" element={<Users />} />
            <Route path="/audit-logs" element={<Users />} />
          </Route>

          <Route
            path="/tickets"
            element={
              <ProtectedRoute roles={["Admin", "Agent", "Customer"]}>
                <Tickets />
              </ProtectedRoute>
            }
          />

          <Route
            path="/tickets/:id"
            element={
              <ProtectedRoute roles={["Admin", "Agent"]}>
                <TicketDetail />
              </ProtectedRoute>
            }
          />

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
