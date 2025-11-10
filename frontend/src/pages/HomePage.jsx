import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Navbar */}
      <div className="navbar bg-base-100 shadow-lg">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            MedisLink
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* 2. Hero Section */}
      <div className="hero min-h-[calc(100vh-80px)] bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Selamat Datang di MedisLink</h1>
            <p className="py-6">
              Solusi peminjaman alat medis cepat dan terjangkau. Pinjam kursi roda, 
              tongkat, dan lainnya dengan mudah.
            </p>
            {/* Kita bisa arahkan ke halaman "list alat" nantinya */}
            <Link to="/tools" className="btn btn-primary">
              Lihat Alat Medis
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage