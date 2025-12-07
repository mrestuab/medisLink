import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Image, Tag, Ruler, Weight } from 'lucide-react'; 

import { getPublicTools, getCategories } from '../services/userServices';

const UserDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('jelajahi');
  
  const [tools, setTools] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState('all');

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

  const filteredTools = selectedCategory === 'all' 
    ? tools 
    : tools.filter(t => t.category?.toLowerCase() === selectedCategory.toLowerCase());

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
            0
          </span>
        </button>
      </div>

      {activeTab === 'jelajahi' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            
            {selectedCategory !== 'all' && (
                <div className="flex justify-between items-center bg-teal-50 px-4 py-2 rounded-lg border border-teal-100">
                    <span className="text-sm text-teal-800 capitalize">Kategori: <strong>{selectedCategory}</strong></span>
                    <button onClick={() => setSelectedCategory('all')} className="text-xs text-teal-600 hover:underline font-bold">Lihat Semua</button>
                </div>
            )}

            {isLoading ? (
              <div className="text-center py-12 text-gray-400">
                <span className="loading loading-spinner loading-md"></span> Memuat data...
              </div>
            ) : filteredTools.length === 0 ? (
              <div className="text-center py-12 text-gray-500 border rounded-xl bg-white">
                Tidak ada alat medis di kategori ini.
              </div>
            ) : (
              filteredTools.map((tool) => (
                <div key={tool.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row gap-6">
                  
                  <div className="w-full sm:w-40 h-40 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 relative">
                    {tool.image_url ? (
                      <img src={tool.image_url} alt={tool.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-gray-400">
                        <Image className="w-8 h-8 mb-2" />
                        <span className="text-[10px]">No Image</span>
                      </div>
                    )}
                    <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded backdrop-blur-sm uppercase font-bold tracking-wider">
                      {tool.category}
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">{tool.name}</h3>
                                
                                {/* Tags Spesifikasi (Type & Size) */}
                                <div className="flex flex-wrap gap-2 mt-2 mb-2">
                                    {tool.type && (
                                      <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-100 font-medium">
                                        {tool.type}
                                      </span>
                                    )}
                                    {tool.size && (
                                      <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded border border-purple-100 font-medium">
                                        Size: {tool.size}
                                      </span>
                                    )}
                                </div>
                            </div>

                            <span className={`text-[10px] font-bold px-2 py-1 rounded border uppercase ${
                                tool.condition === 'baik' || tool.condition === 'Good' ? 'bg-green-50 text-green-700 border-green-200' : 
                                tool.condition === 'rusak ringan' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                'bg-red-50 text-red-700 border-red-200'
                            }`}>
                                {tool.condition}
                            </span>
                        </div>

                        <div className="text-xs text-gray-500 mb-3 space-y-1">
                            {tool.weight_cap && (
                              <p className="flex items-center gap-1">
                                <Weight className="w-3 h-3 text-teal-500" /> Beban Maks: {tool.weight_cap}
                              </p>
                            )}
                            {tool.dimensions && (
                              <p className="flex items-center gap-1">
                                <Ruler className="w-3 h-3 text-teal-500" /> Dimensi: {tool.dimensions}
                              </p>
                            )}
                        </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-2">{tool.description}</p>

                    <div className="flex justify-between items-end border-t border-gray-100 pt-3">
                        <div>
                            <p className="text-xs text-gray-400 mb-0.5">Ketersediaan</p>
                            <p className={`text-sm font-bold ${tool.stock > 0 ? 'text-teal-600' : 'text-red-500'}`}>
                                {tool.stock > 0 ? `${tool.stock} Unit Tersedia` : 'Stok Habis'}
                            </p>
                        </div>
                        
                        <Link 
                          to={tool.stock > 0 ? `/alat/${tool.id}` : '#'} 
                          className={`btn btn-sm px-6 rounded-lg font-medium border-none ${
                            tool.stock > 0 
                            ? 'bg-teal-500 hover:bg-teal-600 text-white' 
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          {tool.stock > 0 ? 'Pilih Alat' : 'Habis'}
                        </Link>
                    </div>
                  </div>

                </div>
              ))
            )}
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Kategori</h3>
              
              {categories.length === 0 ? (
                  <p className="text-sm text-gray-400">Memuat kategori...</p>
              ) : (
                  <ul className="space-y-1">
                    <li>
                        <button 
                            onClick={() => setSelectedCategory('all')}
                            className={`block w-full text-left px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
                                selectedCategory === 'all' 
                                ? 'bg-teal-50 text-teal-700 font-bold border border-teal-100' 
                                : 'text-gray-600 hover:text-teal-700 hover:bg-gray-50'
                            }`}
                        >
                          Semua Alat
                        </button>
                    </li>
                    {categories.map((cat) => (
                      <li key={cat.id || cat.name}>
                        <button 
                            onClick={() => setSelectedCategory(cat.name)}
                            className={`block w-full text-left px-4 py-3 rounded-lg transition-colors text-sm font-medium capitalize ${
                                selectedCategory.toLowerCase() === cat.name.toLowerCase()
                                ? 'bg-teal-50 text-teal-700 font-bold border border-teal-100' 
                                : 'text-gray-600 hover:text-teal-700 hover:bg-gray-50'
                            }`}
                        >
                          {cat.name}
                        </button>
                      </li>
                    ))}
                  </ul>
              )}
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