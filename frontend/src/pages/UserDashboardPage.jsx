import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MOCK_TOOLS = [
  { id: 'T001', name: 'Kursi Roda Manual', category: 'Mobilitas', description: 'Kursi roda manual standar untuk mobilitas sehari-hari', stock: 5, price: 25000 },
  { id: 'T002', name: 'Kursi Roda Elektrik', category: 'Mobilitas', description: 'Kursi roda bertenaga baterai untuk jarak jauh', stock: 3, price: 100000 },
  { id: 'T003', name: 'Tongkat Jalan', category: 'Mobilitas', description: 'Tongkat jalan dengan pegangan nyaman', stock: 15, price: 10000 },
];
const MOCK_CATEGORIES = ['Mobilitas', 'Rehabilitasi', 'Pernapasan'];

const UserDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('jelajahi');

  return (
    <>
      <div className="flex gap-8 border-b border-gray-200 mb-8 mt-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab("jelajahi")}
          className={`pb-3 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
            activeTab === "jelajahi"
              ? "border-teal-500 text-teal-700"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          Jelajahi Alat
        </button>

        <button
          onClick={() => setActiveTab("riwayat")}
          className={`pb-3 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
            activeTab === "riwayat"
              ? "border-teal-500 text-teal-700"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          Riwayat Pinjaman
        </button>

        <button
          onClick={() => setActiveTab("notifikasi")}
          className={`pb-3 font-medium text-sm border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 ${
            activeTab === "notifikasi"
              ? "border-teal-500 text-teal-700"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          Notifikasi
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            activeTab === "notifikasi" ? "bg-teal-100 text-teal-700" : "bg-red-100 text-red-600"
          }`}>
            2
          </span>
        </button>
      </div>

      {activeTab === 'jelajahi' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            {MOCK_TOOLS.map((tool) => (
              <div key={tool.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">{tool.name}</h2>
                    <p className="text-sm text-gray-500 font-medium">{tool.category}</p>
                  </div>
                  {/* Jika ingin menampilkan harga (opsional) */}
                  {/* <div className="text-right bg-teal-50 px-3 py-1 rounded-lg">
                    <p className="text-sm font-bold text-teal-700">
                      Rp {tool.price.toLocaleString('id-ID')}
                    </p>
                  </div> */}
                </div>
                
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">{tool.description}</p>
                
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                     <span className="text-sm text-gray-500">Stok:</span>
                     <span className="text-sm font-bold text-teal-600">{tool.stock} tersedia</span>
                  </div>
                  
                  <Link 
                    to={`/alat/${tool.id}`} 
                    className="btn btn-sm bg-teal-500 hover:bg-teal-600 text-white border-none px-6 h-10 min-h-0 rounded-lg font-medium"
                  >
                    Pilih
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Kategori</h3>
              <ul className="space-y-1">
                {MOCK_CATEGORIES.map((cat) => (
                  <li key={cat}>
                    <a href="#" className="block text-gray-600 hover:text-teal-700 hover:bg-teal-50 px-4 py-3 rounded-lg transition-colors text-sm font-medium">
                      {cat}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-xl p-6">
              <h4 className="font-bold text-teal-800 mb-2 text-sm">Butuh Bantuan?</h4>
              <p className="text-sm text-teal-700 leading-relaxed">
                Pilih alat medis yang Anda butuhkan di samping, lalu isi formulir permintaan pinjaman. Admin kami akan segera memprosesnya.
              </p>
            </div>
          </div>

        </div>
      )}

      {activeTab === 'riwayat' && (
        <div className="text-center py-16 text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
          <p>Belum ada riwayat pinjaman.</p>
        </div>
      )}

      {activeTab === 'notifikasi' && (
        <div className="text-center py-16 text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
          <p>Tidak ada notifikasi baru.</p>
        </div>
      )}
    </>
  );
};

export default UserDashboardPage;