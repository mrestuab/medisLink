import { Routes, Route } from 'react-router-dom'

// Halaman Publik
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

// Layout & Halaman Terproteksi
import ProtectedRoute from './components/ProtectedRoute' // Satpam "Halaman Aman"
import PublicRoute from './components/PublicRoute'     // <-- IMPORT "SATPAM" BARU
import UserLayout from './layouts/UserLayout'
import UserDashboardPage from './pages/UserDashboardPage'
import AdminDashboard from './pages/admin/AdminDashboardPage'
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<UserLayout />}>
            <Route index element={<UserDashboardPage />} />
          </Route>

          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
        
      </Routes>
    </div>
  )
}

export default App