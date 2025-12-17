import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Plus, Trash2, Link as LinkIcon, Image as ImageIcon } from "lucide-react";

import NewsForm from "../../components/admin/NewsForm";
import LoansTable from "../../components/admin/LoansTable";
import InventoryTable from "../../components/admin/InventoryTable";
import AddToolModal from "../../components/admin/AddToolModal";

import { 
    getTools, 
    createTool, 
    deleteTool, 
    getAllLoans, 
    updateLoanStatus, 
    getNews, 
    createNews as apiCreateNews,
    getAds,      
    createAd,    
    deleteAd     
} from "../../services/adminServices";

import { getCurrentUserProfile } from "../../services/userServices"; 

export default function AdminDashboard() {
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState("inventory"); 
  const [isAddToolOpen, setIsAddToolOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [user, setUser] = useState({ name: "Memuat...", role: "" });
  
  const [loans, setLoans] = useState([]); 
  const [tools, setTools] = useState([]);
  const [allNews, setAllNews] = useState([]);
  const [ads, setAds] = useState([]);

  const [newAd, setNewAd] = useState({
      title: "",
      description: "",
      image_url: "",
      link: ""
  });

  useEffect(() => {
    fetchData();
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
        const profile = await getCurrentUserProfile();
        if (profile) {
            setUser({ name: profile.name, role: profile.role });
        }
    } catch (error) {
        console.error("Gagal ambil profil admin:", error);
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [toolsData, loansData, newsData, adsData] = await Promise.all([
        getTools(),
        getAllLoans(),
        getNews(),
        getAds() 
      ]);

      setTools(toolsData);
      setLoans(loansData);
      setAllNews(newsData);
      setAds(adsData || []); 
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleUpdateStatus = async (id, newStatus) => {
    let message = "Lanjutkan aksi ini?";
    if (newStatus === "approved") message = "Setujui peminjaman? Barang akan di-booking.";
    if (newStatus === "rejected") message = "Tolak peminjaman? Stok akan dikembalikan.";
    if (newStatus === "active") message = "Konfirmasi user sudah datang dan barang diserahkan?";
    if (newStatus === "completed") message = "Konfirmasi barang sudah kembali & stok ditambah?";

    if (!window.confirm(message)) return;

    try {
      await updateLoanStatus(id, newStatus);
      fetchData(); 
      alert("Status berhasil diperbarui!");
    } catch (error) {
      console.error(error);
      alert("Gagal update status.");
    }
  };
  
  const handleAddTool = async (formData) => {
      try {
        await createTool(formData);
        setIsAddToolOpen(false);
        fetchData(); 
        alert("Berhasil menambahkan alat baru!");
      } catch (error) {
        console.error("Gagal create tool:", error);
        alert("Gagal menambahkan alat.");
      }
  };

  const handleDeleteTool = async (id) => {
    if (window.confirm("Yakin ingin menghapus alat ini?")) {
        try {
            await deleteTool(id);
            setTools(prev => prev.filter(t => t.id !== id));
        } catch (error) {
            console.error("Gagal delete tool:", error);
            alert("Gagal menghapus alat.");
        }
    }
  };

  const handleCreateNews = async (title, content) => {
    try {
      await apiCreateNews({ 
        title, 
        content, 
        author: user.name || "Admin",
        image_url: "" 
      });
      fetchData(); 
      alert("Berita berhasil dipublikasikan!");
    } catch (error) {
      console.error(error);
      alert("Gagal membuat berita.");
    }
  };

  const handleCreateAd = async (e) => {
      e.preventDefault();
      try {
          await createAd(newAd);
          setNewAd({ title: "", description: "", image_url: "", link: "" }); 
          fetchData();
          alert("Iklan berhasil ditambahkan ke Slider Homepage!");
      } catch (error) {
          console.error(error);
          alert("Gagal membuat iklan.");
      }
  };

  const handleDeleteAd = async (id) => {
      if (!window.confirm("Hapus iklan ini dari slider?")) return;
      try {
          await deleteAd(id);
          fetchData();
      } catch (error) {
          console.error(error);
          alert("Gagal menghapus iklan.");
      }
  };

  if (isLoading) {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-50">
            <span className="loading loading-spinner loading-lg text-teal-600"></span>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <header className="fixed top-0 w-full bg-white z-40 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-500 text-white rounded-lg flex items-center justify-center font-bold shadow-sm">M</div>
            <span className="font-bold text-lg tracking-tight text-gray-800">MedisLink Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right text-sm hidden sm:block">
              <p className="font-bold text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user.role}</p>
            </div>
            <button onClick={handleLogout} className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors" title="Logout">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-28 pb-10">
        <div className="flex gap-8 border-b border-gray-200 mb-8 overflow-x-auto">
          {[
            { id: "loans", label: `Peminjaman (${loans.length})` },
            { id: "inventory", label: "Inventaris" },
            { id: "news", label: "Berita" },
            { id: "ads", label: "Manajemen Iklan" }, 
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id 
                  ? "border-teal-500 text-teal-700 font-bold" 
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "loans" && (
          <LoansTable loans={loans} onUpdateStatus={handleUpdateStatus} />
        )}

        {activeTab === "inventory" && (
          <div>
             <div className="flex justify-end mb-6">
                <button 
                    onClick={() => setIsAddToolOpen(true)}
                    className="btn btn-primary bg-teal-500 hover:bg-teal-600 rounded-xl text-white gap-2 normal-case font-medium px-6"
                >
                    <Plus className="w-5 h-5" /> Tambah Alat
                </button>
             </div>
             <InventoryTable tools={tools} onDelete={handleDeleteTool} />
             <AddToolModal isOpen={isAddToolOpen} onClose={() => setIsAddToolOpen(false)} onSubmit={handleAddTool} />
          </div>
        )}

        {activeTab === "news" && (
           <div className="mt-6 max-w-5xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 mb-10">
              <h3 className="font-bold text-xl text-gray-900 mb-6">Buat Berita Baru</h3>
              <NewsForm onSubmit={handleCreateNews} />
            </div>
            <h3 className="font-bold text-xl text-gray-900 mb-4">Daftar Berita</h3>
            <div className="space-y-4">
              {allNews.length === 0 ? <p className="text-gray-500 text-sm italic">Belum ada berita.</p> : (
                allNews.map((n) => (
                    <div key={n.id || Math.random()} className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-lg text-gray-900">{n.title}</h4>
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-medium">Published</span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">{n.content}</p>
                      <p className="text-xs text-gray-400 font-medium">Diposting: {n.createdAt ? new Date(n.createdAt).toLocaleDateString("id-ID") : "-"}</p>
                    </div>
                  ))
              )}
            </div>
          </div>
        )}

        {activeTab === "ads" && (
            <div className="mt-6 max-w-6xl mx-auto space-y-10">
                
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
                    <h3 className="font-bold text-xl text-gray-900 mb-6 flex items-center gap-2">
                        <Plus className="w-5 h-5 text-teal-600" /> Pasang Iklan Baru (Slider)
                    </h3>
                    <form onSubmit={handleCreateAd} className="space-y-4">
                      <div className="form-control">
                        <label className="label-text text-xs font-bold text-gray-500 mb-1 block">
                          Judul Utama
                        </label>
                        <div className="w-full border border-gray-300 rounded-lg px-3 py-2 focus-within:border-teal-500">
                          <input
                            type="text"
                            placeholder="Contoh: Diskon Kursi Roda 50%"
                            className="w-full outline-none border-none bg-transparent text-sm"
                            value={newAd.title}
                            onChange={e => setNewAd({ ...newAd, title: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="form-control">
                        <label className="label-text text-xs font-bold text-gray-500 mb-1 block">
                          Link Tujuan (Opsional)
                        </label>
                        <div className="flex items-center gap-2 w-full border border-gray-300 rounded-lg px-3 py-2 focus-within:border-teal-500">
                          <LinkIcon className="w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            placeholder="/tools atau /login"
                            className="grow outline-none border-none bg-transparent text-sm"
                            value={newAd.link}
                            onChange={e => setNewAd({ ...newAd, link: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="form-control">
                        <label className="label-text text-xs font-bold text-gray-500 mb-1 block">
                          URL Gambar
                        </label>
                        <div className="flex items-center gap-2 w-full border border-gray-300 rounded-lg px-3 py-2 focus-within:border-teal-500">
                          <ImageIcon className="w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            placeholder="https://..."
                            className="grow outline-none border-none bg-transparent text-sm"
                            value={newAd.image_url}
                            onChange={e => setNewAd({ ...newAd, image_url: e.target.value })}
                            required
                          />
                        </div>
                        <span className="text-xs text-gray-400 mt-1">
                          Gunakan link gambar langsung (Unsplash / Imgur)
                        </span>
                      </div>

                      <div className="form-control">
                        <label className="label-text text-xs font-bold text-gray-500 mb-1 block">
                          Deskripsi Singkat
                        </label>
                        <div className="w-full border border-gray-300 rounded-lg px-3 py-2 focus-within:border-teal-500">
                          <textarea
                            placeholder="Deskripsi yang muncul di bawah judul..."
                            className="w-full outline-none border-none bg-transparent text-sm resize-none"
                            rows={2}
                            value={newAd.description}
                            onChange={e => setNewAd({ ...newAd, description: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary w-full bg-teal-600 rounded-lg hover:bg-teal-700 border-none text-white mt-4 shadow-lg shadow-teal-100"
                      >
                        Upload & Tampilkan di Slider
                      </button>
                    </form>
                </div>

                <div>
                    <h3 className="font-bold text-xl text-gray-900 mb-6">Iklan Aktif ({ads.length})</h3>
                    {ads.length === 0 ? (
                        <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed text-gray-500">
                            Belum ada iklan yang aktif. Homepage akan menampilkan iklan dummy.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {ads.map((ad) => (
                                <div key={ad.id || ad._id} className="relative group rounded-xl overflow-hidden shadow-md bg-black h-64 border border-gray-200">
                                    <img 
                                        src={ad.image_url} 
                                        alt={ad.title} 
                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-300" 
                                    />
                                    
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 pt-12">
                                        <h4 className="text-white font-bold text-xl mb-1">{ad.title}</h4>
                                        <p className="text-gray-300 text-sm line-clamp-2">{ad.description}</p>
                                    </div>

                                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button 
                                            onClick={() => handleDeleteAd(ad.id || ad._id)}
                                            className="btn btn-sm btn-error bg-red-600 border-none text-white shadow-lg gap-2"
                                        >
                                            <Trash2 className="w-4 h-4" /> Hapus
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        )}

      </main>
    </div>
  );
}