import { Routes, Route, Navigate } from 'react-router-dom'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import UserDashboardPage from './pages/UserDashboardPage'
import AdminDashboard from './pages/admin/AdminDashboardPage'

import UserLayout from './layouts/UserLayout'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import ToolDetailPage from './pages/ToolDetailPage'
import ToolPage from './pages/ToolPage'
import DonationPage from './pages/DonationPage'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/alat" element={<ToolPage />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['user']} />}>
          <Route path="/dashboard" element={<UserLayout />}>
            <Route index element={<UserDashboardPage />} />
          </Route>
            <Route path="alat/:id" element={<ToolDetailPage />} />
            <Route path="/donasi" element={<DonationPage />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
        
      </Routes>
    </div>
  )
}

export default App