import React from "react";
import { CheckCircle, XCircle, User, Phone, Activity, Calendar } from "lucide-react";

const LoansTable = ({ loans, onApprove, onReject }) => {
  if (!loans || loans.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500 bg-white rounded-2xl border border-gray-200 shadow-sm">
        <p>Tidak ada permintaan pinjaman yang menunggu persetujuan.</p>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-6">
      {loans.map((loan) => {
        return (
          <div 
            key={loan.id} 
            className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-200"
          >
            
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Data Peminjam</p>
                <div className="flex items-start gap-3">
                    <div className="bg-teal-50 p-2.5 rounded-full flex-shrink-0">
                        <User className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                        <h4 className="text-base font-bold text-gray-900 line-clamp-1">
                            {loan.borrowerName || "Nama Tidak Tersedia"}
                        </h4>
                        <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-1">
                            <Phone className="w-3.5 h-3.5" /> 
                            <span>{loan.borrowerPhone || "-"}</span>
                        </div>
                    </div>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Alat Medis</p>
                <h4 className="text-lg font-bold text-gray-900 text-teal-700 leading-tight">
                    {loan.toolName || "Alat Tidak Dikenal"}
                </h4>
                <div className="flex gap-4 mt-2.5">
                    <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md text-xs font-semibold">
                        Jumlah: {loan.quantity} Unit
                    </span>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Durasi Peminjaman</p>
                <div className="flex items-center gap-2 mb-1">
                    <Calendar className="w-4 h-4 text-teal-500" />
                    <span className="font-bold text-gray-800 text-sm">
                        {new Date(loan.startDate).toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                </div>
                <div className="pl-6 text-sm text-gray-500">
                    s/d <span className="font-medium text-gray-700">{new Date(loan.endDate).toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 bg-gray-50 p-5 rounded-xl border border-gray-100 mb-8">
                
                <div>
                    <p className="text-xs font-bold text-gray-500 mb-1.5 flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-red-500" /> Kondisi Medis Pasien:
                    </p>
                    <p className="text-sm font-semibold text-gray-900 leading-relaxed">
                        {loan.medicalCondition || "-"}
                    </p>
                </div>

                <div>
                    <p className="text-xs font-bold text-gray-500 mb-1.5">Tujuan / Catatan:</p>
                    <p className="text-sm text-gray-600 italic leading-relaxed">
                        "{loan.purpose}"
                    </p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-gray-100">
              <button
                onClick={() => onApprove(loan.id)}
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-teal-100 active:scale-[0.98]"
              >
                <CheckCircle className="w-5 h-5" />
                Setujui Peminjaman
              </button>
              
              <button
                onClick={() => onReject(loan.id)}
                className="flex-1 bg-white hover:bg-red-50 text-red-600 border border-red-200 hover:border-red-300 font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                <XCircle className="w-5 h-5" />
                Tolak
              </button>
            </div>

          </div>
        );
      })}
    </div>
  );
};

export default LoansTable;