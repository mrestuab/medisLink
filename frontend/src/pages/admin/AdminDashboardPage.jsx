import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Plus } from "lucide-react";

import InventoryTable from "../../components/admin/InventoryTable.jsx";
import LoansTable from "../../components/admin/LoansTable.jsx";
import AddToolModal from "../../components/admin/AddToolModal.jsx";
import NewsForm from "../../components/admin/NewsForm.jsx";

import { getTools, createTool, getPendingLoans, updateLoanStatus, getNews, createNews as apiCreateNews } from "../../services/adminServices.js";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("loans");
  
  const [pendingLoans, setPendingLoans] = useState([]);
  const [tools, setTools] = useState([]);
  const [allNews, setAllNews] = useState([]);
  
  const [isAddToolOpen, setIsAddToolOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

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
      await updateLoanStatus(id, "aktif"); 
      setPendingLoans((prev) => prev.filter((l) => l.id !== id));
    } catch (error) {
      console.error("Approve loan error:", error);
      alert("Gagal menyetujui pinjaman");
    }
  };
  const rejectLoan = async (id) => {
    try {
      await updateLoanStatus(id, "ditolak");
      setPendingLoans((prev) => prev.filter((l) => l.id !== id));
    } catch (error) {
      console.error("Reject loan error:", error);
      alert("Gagal menolak pinjaman");
    }
  };
  
  const handleAddTool = async (toolData) => {
      try {
        await createTool(toolData);
        setIsAddToolOpen(false);
        fetchData(); 
        alert("Berhasil menambahkan alat!");

      } catch (error) {
        console.error("Gagal create tool:", error);
        alert("Gagal menambah alat. Cek console.");
      }
  };

  const handleCreateNews = async (title, content) => {
    try {
      await apiCreateNews({ 
        title, 
        content, 
        author: "Admin", 
        image_url: "" 
      });
      fetchData(); 
    } catch (error) {
      console.error("Create news error:", error);
      alert("Gagal membuat berita");
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading Dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="fixed top-0 w-full bg-white z-40 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-500 text-white rounded-lg flex items-center justify-center font-bold">M</div>
            <span className="font-semibold text-gray-800">MedisLink Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right text-sm">
              <p className="font-medium text-gray-900">Admin</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
            <button onClick={handleLogout} className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors">
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
                  ? "border-teal-500 text-teal-700" 
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "loans" && (
          <LoansTable 
            loans={pendingLoans} 
            tools={tools} 
            onApprove={approveLoan} 
            onReject={rejectLoan} 
          />
        )}

        {activeTab === "inventory" && (
          <div>
             <div className="flex justify-end mb-6">
                <button 
                    onClick={() => setIsAddToolOpen(true)}
                    className="btn btn-primary w-1/6 bg-teal-500 hover:bg-teal-600 border-none text-white gap-2 normal-case"
                >
                    <Plus className="w-5 h-5" />
                    Tambah Alat
                </button>
             </div>

             <InventoryTable tools={tools} />

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

            <h3 className="font-bold text-xl text-gray-900 mb-4">
              Berita yang Dipublikasikan
            </h3>

            <div className="space-y-4">
              {allNews.length === 0 ? (
                 <p className="text-gray-500 text-sm">Belum ada berita.</p>
              ) : (
                allNews.map((n) => (
                    <div key={n.id || Math.random()} className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                      <h4 className="font-bold text-lg text-gray-900 mb-2">{n.title}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">{n.content}</p>
                      <p className="text-xs text-gray-400 font-medium">
                        {n.createdAt ? new Date(n.createdAt).toLocaleDateString("id-ID") : "-"}
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