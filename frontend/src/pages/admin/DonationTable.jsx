import React, { useState } from "react";
import { CheckCircle, Clock, X, MapPin, User, Eye, Box } from "lucide-react";

const DonationsTable = ({ donations, onApprove }) => {
  const [selectedDonation, setSelectedDonation] = useState(null);

  // Buka Modal
  const handleReviewClick = (donation) => {
    setSelectedDonation(donation);
  };

  // Tutup Modal
  const handleCloseModal = () => {
    setSelectedDonation(null);
  };

  // Eksekusi Approve
  const handleConfirmApproval = () => {
    if (selectedDonation) {
        onApprove(selectedDonation.id || selectedDonation._id);
        handleCloseModal();
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="font-semibold text-gray-600">Barang</th>
                <th className="font-semibold text-gray-600">Donatur</th>
                <th className="font-semibold text-gray-600 text-center">Status</th>
                <th className="font-semibold text-gray-600 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {donations.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-8 text-gray-500 italic">
                    Belum ada pengajuan donasi.
                  </td>
                </tr>
              ) : (
                donations.map((item) => (
                  <tr key={item.id || item._id} className="hover:bg-gray-50/50">
                    <td>
                      <div className="flex items-center gap-4">
                        <div className="avatar">
                          <div className="w-12 h-12 rounded-lg ring-1 ring-gray-200">
                            <img src={item.image_url} alt="Foto" className="object-cover"/>
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">{item.tool_name}</div>
                          <div className="text-xs text-gray-500">{item.category} • {item.quantity} Unit</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="text-sm font-medium text-gray-800">{item.user_detail?.name}</div>
                      <div className="text-xs text-gray-500">{item.user_detail?.phone}</div>
                    </td>
                    <td className="text-center">
                      {item.status === "pending" ? (
                          <span className="badge badge-warning text-xs">Menunggu</span>
                      ) : (
                          <span className="badge badge-success text-white text-xs">Selesai</span>
                      )}
                    </td>
                    <td className="text-center">
                      {item.status === "pending" ? (
                          <button 
                              onClick={() => handleReviewClick(item)}
                              className="btn btn-sm btn-outline btn-info gap-2 hover:text-white"
                          >
                              <Eye className="w-4 h-4" /> Review
                          </button>
                      ) : (
                          <button disabled className="btn btn-sm btn-disabled gap-2">
                              <CheckCircle className="w-4 h-4" /> Stok Masuk
                          </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- MODAL REVIEW DETIL --- */}
      {selectedDonation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in zoom-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
                
                {/* Header */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-gray-50">
                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <Box className="w-5 h-5 text-teal-600" /> Review Donasi
                    </h3>
                    <button onClick={handleCloseModal} className="p-1 hover:bg-gray-200 rounded-full transition">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Content Scrollable */}
                <div className="p-6 overflow-y-auto">
                    {/* Foto Besar */}
                    <div className="w-full h-56 rounded-xl overflow-hidden mb-6 border border-gray-200 shadow-sm">
                        <img src={selectedDonation.image_url} alt="Detail" className="w-full h-full object-cover"/>
                    </div>

                    <div className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Nama Alat</label>
                                <p className="font-bold text-gray-900 text-lg">{selectedDonation.tool_name}</p>
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Jumlah</label>
                                <p className="font-bold text-teal-600 text-lg">{selectedDonation.quantity} Unit</p>
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Deskripsi & Kondisi</label>
                            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100 mt-1 leading-relaxed">
                                "{selectedDonation.description}"
                            </p>
                        </div>

                        <div className="flex gap-4">
                             <div className="flex-1">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                                    <MapPin className="w-3 h-3" /> Lokasi Jemput
                                </label>
                                <p className="text-sm text-gray-800">{selectedDonation.pickup_address}</p>
                             </div>
                        </div>

                        <div className="border-t border-gray-100 pt-4">
                             <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                                <User className="w-3 h-3" /> Data Donatur
                            </label>
                            <div className="flex items-center gap-3 bg-teal-50 p-3 rounded-xl border border-teal-100">
                                <div className="w-10 h-10 rounded-full bg-white text-teal-700 font-bold flex items-center justify-center border border-teal-100 shadow-sm">
                                    {selectedDonation.user_detail?.name?.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">{selectedDonation.user_detail?.name}</p>
                                    <p className="text-xs text-gray-500">{selectedDonation.user_detail?.phone}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                    <button onClick={handleCloseModal} className="btn btn-ghost text-gray-500 font-medium">
                        Batal
                    </button>
                    <button 
                        onClick={handleConfirmApproval}
                        className="btn bg-teal-600 hover:bg-teal-700 text-white border-none shadow-lg shadow-teal-100"
                    >
                        <CheckCircle className="w-4 h-4" /> Terima & Masukkan Stok
                    </button>
                </div>
            </div>
        </div>
      )}
    </>
  );
};

export default DonationsTable;