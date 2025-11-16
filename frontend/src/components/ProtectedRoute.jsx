import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // 1. Cek apakah token ada di localStorage
  const token = localStorage.getItem('token');

  // 2. Jika tidak ada token, "tendang" ke halaman login
  if (!token) {
    // 'replace' berarti user tidak bisa klik "back" ke halaman admin
    return <Navigate to="/login" replace />;
  }

  // 3. Jika ada token, izinkan akses ke halaman (AdminDashboard)
  // <Outlet /> adalah 'placeholder' untuk komponen anak (AdminDashboard)
  return <Outlet />;
};

export default ProtectedRoute;