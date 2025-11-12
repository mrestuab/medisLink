import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <nav className="navbar fixed top-0 w-full z-50 backdrop-blur-md bg-base-100/80 border-b border-gray-200/30">
        <div className="max-w-7xl mx-auto w-full px-6 py-2 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              M
            </div>
            <span className="font-semibold text-lg">MedisLink</span>
          </Link>
          <Link
            to="/login"
            className="btn btn-primary btn-sm bg-teal-500 hover:bg-teal-600 border-none text-white font-medium text-sm px-5 rounded-lg"
          >
            Login
          </Link>
        </div>
      </nav>

      <section className="relative flex-1 flex items-center justify-center pt-24 pb-20 px-6 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-20 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"></div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="badge badge-lg gap-2 mb-8 px-4 py-4 rounded-full border border-gray-200/50 bg-white/50 backdrop-blur">
            <span className="w-2 h-2 rounded-full bg-teal-500"></span>
            <span className="text-sm text-gray-600">Solusi Terpercaya untuk Kesehatan Anda</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-balance">
            Akses Alat Medis dengan{" "}
            <span className="bg-gradient-to-r from-teal-500 to-emerald-700 bg-clip-text text-transparent">Mudah</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed text-balance">
            Pinjam kursi roda, tongkat, dan peralatan medis lainnya dengan harga terjangkau. Proses cepat, aman, dan
            terpercaya.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              to="/tools"
              className="btn btn-primary bg-teal-500 hover:bg-teal-600 border-none text-white font-semibold px-8 py-3 h-auto rounded-lg"
            >
              Lihat Alat Medis
            </Link>
            <button className="btn btn-outline border-gray-300 hover:border-gray-400 text-gray-700 hover:bg-gray-100 font-semibold px-8 py-3 h-auto">
              Hubungi Kami
            </button>
          </div>

          <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
            <span className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400">
                  ★
                </span>
              ))}
            </span>
            <span>Dipercaya oleh ribuan keluarga Indonesia</span>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-gray-200/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-3xl md:text-4xl font-bold mb-4 text-balance">Mengapa Memilih MedisLink?</h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Kami menyediakan solusi kesehatan yang terjangkau, transparan, dan mudah diakses
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-gray-200/50 bg-white/50 hover:bg-white transition-colors group">
              <div className="w-12 h-12 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-500 mb-4 group-hover:bg-teal-500/20 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-13c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Harga Terjangkau</h3>
              <p className="text-gray-600 text-sm">Paket sewa yang fleksibel sesuai kebutuhan Anda</p>
            </div>

            <div className="p-6 rounded-2xl border border-gray-200/50 bg-white/50 hover:bg-white transition-colors group">
              <div className="w-12 h-12 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-500 mb-4 group-hover:bg-teal-500/20 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Layanan Terbaik</h3>
              <p className="text-gray-600 text-sm">Tim profesional siap melayani Anda 24/7</p>
            </div>

            <div className="p-6 rounded-2xl border border-gray-200/50 bg-white/50 hover:bg-white transition-colors group">
              <div className="w-12 h-12 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-500 mb-4 group-hover:bg-teal-500/20 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-13c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Pengiriman Cepat</h3>
              <p className="text-gray-600 text-sm">Terima alat medis dalam 24 jam ke lokasi Anda</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-gray-200/30 bg-white/30">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Mulai Hari Ini</h2>
          <p className="text-gray-600 mb-8">Jangan biarkan keterbatasan fisik menghalangi aktivitas Anda</p>
          <Link
            to="/tools"
            className="btn btn-primary bg-teal-500 hover:bg-teal-600 border-none text-white font-semibold px-8 py-3 h-auto rounded-lg"
          >
            Jelajahi Sekarang
          </Link>
        </div>
      </section>

      <footer className="border-t border-gray-200/30 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-500 text-sm">© 2025 MedisLink. Semua hak dilindungi.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="#" className="text-gray-500 hover:text-gray-900 text-sm transition-colors">
              Tentang Kami
            </Link>
            <Link to="#" className="text-gray-500 hover:text-gray-900 text-sm transition-colors">
              Kebijakan Privasi
            </Link>
            <Link to="#" className="text-gray-500 hover:text-gray-900 text-sm transition-colors">
              Hubungi Kami
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}