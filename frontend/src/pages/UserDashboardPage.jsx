import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getPublicTools, getCategories } from '../services/userServices';

const UserDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('jelajahi');
  
  const [tools, setTools] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [toolsData, categoriesData] = await Promise.all([
          getPublicTools(),
          getCategories()
        ]);
        setTools(toolsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error loading dashboard:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex gap-8 border-b border-gray-200 mb-8 overflow-x-auto mt-6">
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
            0
          </span>
        </button>
      </div>

      {activeTab === 'jelajahi' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            
            {isLoading ? (
              <div className="text-center py-12 text-gray-400">Memuat data alat...</div>
            ) : tools.length === 0 ? (
              <div className="text-center py-12 text-gray-500 border rounded-xl bg-white">
                Belum ada alat medis yang tersedia saat ini.
              </div>
            ) : (
              tools.map((tool) => (
                <div key={tool.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">{tool.name}</h2>
                      <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded mt-1 capitalize">
                        {tool.category}
                      </span>
                    </div>
                    <div className="text-right">
                       <span className={`text-xs font-medium px-2 py-1 rounded ${
                         tool.condition === 'baik' || tool.condition === 'Good' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'
                       }`}>
                         {tool.condition}
                       </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-6 leading-relaxed">{tool.description}</p>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                       <span className="text-sm text-gray-500">Stok:</span>
                       <span className={`text-sm font-bold ${tool.stock > 0 ? 'text-teal-600' : 'text-red-500'}`}>
                         {tool.stock > 0 ? `${tool.stock} tersedia` : 'Habis'}
                       </span>
                    </div>
                    
                    <Link 
                      to={`/alat/${tool.id}`} 
                      className={`btn btn-sm border-none px-6 h-10 min-h-0 rounded-lg font-medium ${
                        tool.stock > 0 
                        ? 'bg-teal-500 hover:bg-teal-600 text-white' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none'
                      }`}
                    >
                      {tool.stock > 0 ? 'Pilih' : 'Habis'}
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Kategori</h3>
              <ul className="space-y-1">
                {categories.map((cat) => (
                  <li key={cat.id || cat.name}>
                    <a href="#" className="block text-gray-600 hover:text-teal-700 hover:bg-teal-50 px-4 py-3 rounded-lg transition-colors text-sm font-medium capitalize">
                      {cat.name}
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