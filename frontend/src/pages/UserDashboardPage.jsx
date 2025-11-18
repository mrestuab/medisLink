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
    <div className="flex items-center gap-8 border-b pb-2 relative">
      <button
        onClick={() => setActiveTab("jelajahi")}
        className={`pb-2 ${
          activeTab === "jelajahi"
            ? "font-semibold text-black border-b-2 border-teal-500"
            : "text-gray-500"
        }`}
      >
        Jelajahi Alat
      </button>

      <button
        onClick={() => setActiveTab("riwayat")}
        className={`pb-2 ${
          activeTab === "riwayat"
            ? "font-semibold text-black border-b-2 border-teal-500"
            : "text-gray-500"
        }`}
      >
        Riwayat Pinjaman
      </button>

      <button
        onClick={() => setActiveTab("notifikasi")}
        className={`pb-2 flex items-center gap-2 ${
          activeTab === "notifikasi"
            ? "font-semibold text-black border-b-2 border-teal-500"
            : "text-gray-500"
        }`}
      >
        Notifikasi

        <span className="px-2 py-0.5 text-white text-xs rounded-full bg-red-600">
          2
        </span>
      </button>

    </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 space-y-4">
          {MOCK_TOOLS.map((tool) => (
            <div key={tool.id} className="card card-side bg-base-100 shadow-sm border border-gray-200/60 p-4 items-center">
              <div className="card-body p-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="card-title text-lg font-semibold">{tool.name}</h2>
                    <p className="text-sm text-gray-500">{tool.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-teal-600">
                      Rp {tool.price.toLocaleString('id-ID')}/hari
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">{tool.description}</p>
                <div className="flex justify-between items-end mt-3">
                  <p className="text-sm font-medium text-green-600">
                    {tool.stock} tersedia
                  </p>
                  <Link to={`/alat/${tool.id}`} className="link link-primary text-teal-600 font-medium">
                    Pilih →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1 space-y-4">
          <div className="card bg-base-100 shadow-sm border border-gray-200/60">
            <div className="card-body p-5">
              <h3 className="font-semibold mb-3">Kategori</h3>
              <ul className="space-y-2">
                {MOCK_CATEGORIES.map((cat) => (
                  <li key={cat}>
                    <a href="#" className="text-gray-600 hover:text-teal-600">
                      {cat}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="card bg-teal-50 border-teal-200 border">
            <div className="card-body p-5">
              <p className="text-sm text-teal-700">
                Pilih alat medis yang Anda butuhkan dan isi formulir permintaan pinjaman.
              </p>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default UserDashboardPage;