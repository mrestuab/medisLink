import React from "react";
import { CheckCircle, XCircle } from "lucide-react";

const LoansTable = ({ loans, tools, onApprove, onReject }) => {
  if (loans.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 bg-white rounded-lg border border-gray-200">
        <p>Tidak ada permintaan pinjaman saat ini.</p>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-6">
      {loans.map((loan) => {
        const tool = tools.find((t) => t.id === loan.medicalToolId);
        const borrower = { name: "Budi Santoso", phone: "08987654321" };

        return (
          <div key={loan.id} className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            <div className="grid md:grid-cols-3 gap-8 mb-6">
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">Peminjam</p>
                <h4 className="text-lg font-bold text-gray-900">{borrower.name}</h4>
                <p className="text-sm text-gray-500 mt-1">{borrower.phone}</p>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">Alat yang Diminta</p>
                <h4 className="text-lg font-bold text-gray-900">{tool?.name || "Alat Tidak Dikenal"}</h4>
                <p className="text-sm text-gray-500 mt-1">Jumlah: {loan.quantity}</p>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">Periode Pinjam</p>
                <h4 className="text-lg font-bold text-gray-900">
                  {new Date(loan.startDate).toLocaleDateString("id-ID")}
                </h4>
                <p className="text-sm text-gray-500 mt-1">
                  s/d {new Date(loan.endDate).toLocaleDateString("id-ID")}
                </p>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-sm font-bold text-gray-800 mb-1">Tujuan Penggunaan:</p>
              <p className="text-sm text-gray-600 leading-relaxed">{loan.purpose}</p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => onApprove(loan.id)}
                className="flex-1 bg-[#00C851] hover:bg-[#00a844] text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors text-lg"
              >
                <CheckCircle className="w-5 h-5" />
                Setujui
              </button>
              
              <button
                onClick={() => onReject(loan.id)}
                className="flex-1 bg-[#DC0000] hover:bg-[#b30000] text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors text-lg"
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