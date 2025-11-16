import { Routes, Route } from 'react-router-dom'

// Halaman Publik
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

// Layout & Halaman Terproteksi
import ProtectedRoute from './components/ProtectedRoute'
import UserLayout from './layouts/UserLayout' // <-- IMPORT BARU
import UserDashboardPage from './pages/UserDashboardPage' // <-- IMPORT BARU
// import AdminDashboard from './pages/AdminDashboard' // <-- SUDAH ADA

function App() {
  return (
    <div>
      <Routes>
        {/* Rute Publik */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Rute Terproteksi (Butuh Login) */}
        <Route element={<ProtectedRoute />}>
          
          {/* == Rute untuk PENGGUNA (User) == */}
          {/* Ini yang akan dituju oleh navigate('/dashboard') */}
          <Route path="/dashboard" element={<UserLayout />}>
            <Route index element={<UserDashboardPage />} />
            {/* Nanti, halaman "Riwayat" dan "Notifikasi" bisa ditambah di sini:
              <Route path="riwayat" element={<HalamanRiwayat />} />
              <Route path="notifikasi" element={<HalamanNotifikasi />} />
            */}
          </Route>

          {/* == Rute untuk ADMIN == */}
          {/* Kita pindahkan rute admin ke '/admin/dashboard' */}
          {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}

        </Route>
        
      </Routes>
    </div>
  )
}

export default App