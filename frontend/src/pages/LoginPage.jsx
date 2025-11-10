import React from 'react'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl">Login</h2>
          <p className="text-center text-sm mb-4">
            Masuk untuk meminjam alat medis
          </p>

          <form>
            {/* Email Input */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email@anda.com"
                className="input input-bordered w-full"
              />
            </div>

            {/* Password Input */}
            <div className="form-control w-full mt-2">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="******"
                className="input input-bordered w-full"
              />
            </div>

            <div className="card-actions justify-end mt-6">
              <button type="submit" className="btn btn-primary w-full">
                Login
              </button>
            </div>
          </form>

          <div className="text-center mt-4 text-sm">
            <Link to="/" className="link link-primary">
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage