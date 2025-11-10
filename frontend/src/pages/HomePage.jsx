import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div>
      <h2>Ini Halaman Beranda (Home)</h2>
      <Link to="/login">Pergi ke Halaman Login</Link>
    </div>
  )
}

export default HomePage