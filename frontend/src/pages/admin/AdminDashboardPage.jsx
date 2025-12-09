import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Plus } from "lucide-react";

import NewsForm from "../../components/admin/NewsForm";
import LoansTable from "../../components/admin/LoansTable";
import InventoryTable from "../../components/admin/InventoryTable";
import AddToolModal from "../../components/admin/AddToolModal";

import { 
    getTools, 
    createTool, 
    deleteTool, 
    getPendingLoans, 
    updateLoanStatus, 
    getNews, 
    createNews as apiCreateNews 
} from "../../services/adminServices";

import { getCurrentUserProfile } from "../../services/userServices"; 

export default function AdminDashboard() {
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState("inventory"); 
  const [isAddToolOpen, setIsAddToolOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [user, setUser] = useState({ name: "Memuat...", role: "" });
  
  const [pendingLoans, setPendingLoans] = useState([]);
  const [tools, setTools] = useState([]);
  const [allNews, setAllNews] = useState([]);

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
      const [toolsData, loansData, newsData] = await Promise.all([
        getTools(),
        getPendingLoans(),
        getNews()
      ]);

      setTools(toolsData);
      setPendingLoans(loansData);
      setAllNews(newsData);
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

  const approveLoan = async (id) => {
    try {
      await updateLoanStatus(id, "approved"); 
      setPendingLoans((prev) => prev.filter((l) => l.id !== id));
      alert("Permintaan pinjaman disetujui.");
    } catch (error) {
      console.error(error);
      alert("Gagal menyetujui pinjaman.");
    }
  };

  const rejectLoan = async (id) => {
    try {
      setPendingLoans((prev) => prev.filter((l) => l.id !== id));
      alert("Permintaan pinjaman ditolak.");
    } catch (error) {
      console.error(error);
      alert("Gagal menolak pinjaman.");
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
        alert("Gagal menambahkan alat. Pastikan koneksi backend aman.");
      }
  };

  const handleDeleteTool = async (id) => {
    if (window.confirm("Yakin ingin menghapus alat ini? Data yang dihapus tidak bisa dikembalikan.")) {
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
            <span className="font-semibold text-lg text-gray-800">MedisLink Admin</span>
          </div>
          <div className="flex items-center gap-4">
            
            <div className="text-right text-sm hidden sm:block">
              <p className="font-bold text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user.role}</p>
            </div>

            <button 
                onClick={handleLogout} 
                className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors"
                title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-28 pb-10">
        <div className="flex gap-8 border-b border-gray-200 mb-8 overflow-x-auto">
          {[
            { id: "loans", label: `Permintaan Pinjaman (${pendingLoans.length})` },
            { id: "inventory", label: "Inventaris" },
            { id: "news", label: "Berita" },
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
          <LoansTable 
            loans={pendingLoans} 
            onApprove={approveLoan} 
            onReject={rejectLoan} 
          />
        )}

        {activeTab === "inventory" && (
          <div>
             <div className="flex justify-end mb-6">
                <button 
                    onClick={() => setIsAddToolOpen(true)}
                    className="btn btn-primary bg-teal-500 hover:bg-teal-600 rounded-xl text-white gap-2 normal-case font-medium px-6"
                >
                    <Plus className="w-5 h-5" />
                    Tambah Alat
                </button>
             </div>

             <InventoryTable tools={tools} onDelete={handleDeleteTool} />

             <AddToolModal 
                isOpen={isAddToolOpen} 
                onClose={() => setIsAddToolOpen(false)} 
                onSubmit={handleAddTool} 
             />
          </div>
        )}

        {activeTab === "news" && (
           <div className="mt-6 max-w-5xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 mb-10">
              <h3 className="font-bold text-xl text-gray-900 mb-6">Tambah Berita</h3>
              <NewsForm onSubmit={handleCreateNews} />
            </div>

            <h3 className="font-bold text-xl text-gray-900 mb-4">Berita yang Dipublikasikan</h3>
            <div className="space-y-4">
              {allNews.length === 0 ? (
                 <p className="text-gray-500 text-sm italic">Belum ada berita yang dipublikasikan.</p>
              ) : (
                allNews.map((n) => (
                    <div key={n.id || Math.random()} className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-lg text-gray-900">{n.title}</h4>
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-medium">Published</span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">{n.content}</p>
                      <p className="text-xs text-gray-400 font-medium">
                        Diposting: {n.createdAt ? new Date(n.createdAt).toLocaleDateString("id-ID") : "-"}
                      </p>
                    </div>
                  ))
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}