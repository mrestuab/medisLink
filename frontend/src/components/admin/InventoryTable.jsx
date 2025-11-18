import React from "react";

const InventoryTable = ({ tools }) => {
  if (!tools || tools.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 border rounded-lg">
        Belum ada data alat medis.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tools.map((tool) => (
        <div
          key={tool.id}
          className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all"
        >
          <div className="grid md:grid-cols-3 gap-8 items-start">
            <div>
              <p className="text-xs text-gray-500 mb-1 font-medium">Alat Medis</p>
              <h4 className="font-bold text-lg text-gray-900">{tool.name}</h4>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {tool.description}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1 font-medium">Status Stok</p>
              <p className="font-semibold text-sm text-gray-900 mb-2">
                Total: {tool.totalQuantity} | Tersedia: {tool.availableQuantity}
              </p>
              <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-teal-500 h-2.5 rounded-full"
                  style={{
                    width: `${(tool.availableQuantity / tool.totalQuantity) * 100}%`,
                  }}
                ></div>
              </div>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1 font-medium">Kondisi Alat</p>
              
              <div className="flex flex-col gap-2">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold w-fit
                  ${tool.condition === 'baik' || tool.condition === 'Good' ? 'bg-green-100 text-green-700' : 
                    tool.condition === 'rusak ringan' ? 'bg-yellow-100 text-yellow-700' : 
                    'bg-red-100 text-red-700'}`}>
                  {tool.condition}
                </span>

                <p className="text-sm text-gray-600 mt-1">
                  Status: <span className="font-medium text-gray-900">{tool.status || 'Tersedia'}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InventoryTable;