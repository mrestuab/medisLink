import React, { useState, useEffect } from "react";
import { X, Info, Image as ImageIcon } from "lucide-react";

const TOOL_PRESETS = {
  MOBILITAS: {
    types: ["Kursi Roda", "Kruk Ketiak", "Tongkat Jalan", "Walker"],
    specs: {
      "Kursi Roda": { sizeLabel: "Ukuran (Inch)", capLabel: "Beban Max (kg)", typeLabel: "Varian (Travel/Standard)" },
      "Kruk Ketiak": { sizeLabel: "Size (S/M/L)", capLabel: "Tinggi Badan (cm)", typeLabel: "Jenis" },
      "Tongkat Jalan": { sizeLabel: "Tapak (Kaki 1/3/4)", capLabel: "-", typeLabel: "Tipe" },
      "Walker": { sizeLabel: "-", capLabel: "-", typeLabel: "Mode (Fixed/Reciprocal)" },
    }
  },
  PERNAPASAN: {
    types: ["Nebulizer", "Tabung Oksigen", "Oxygen Concentrator", "Masker Oksigen", "Pulse Oximeter"],
    specs: {
      "Tabung Oksigen": { sizeLabel: "Volume (m3)", capLabel: "Tinggi (cm)", typeLabel: "Tipe" },
      "Oxygen Concentrator": { sizeLabel: "Flow (LPM)", capLabel: "-", typeLabel: "Kapasitas" },
    }
  },
  REHABILITASI: {
    types: ["Hospital Bed", "Kasur Anti-Decubitus", "Commode Chair"],
    specs: {
      "Hospital Bed": { sizeLabel: "-", capLabel: "-", typeLabel: "Jumlah Crank" },
      "Kasur Anti-Decubitus": { sizeLabel: "Tipe (Bubble/Tubular)", capLabel: "Beban Max", typeLabel: "Model" },
    }
  },
  GENERAL: {
    types: ["Tensimeter Digital", "Glucometer", "Popok Dewasa", "Foley Catheter"],
    specs: {
      "Popok Dewasa": { sizeLabel: "Size (M/L/XL)", capLabel: "Lingkar Pinggang (cm)", typeLabel: "Tipe" },
      "Foley Catheter": { sizeLabel: "Ukuran (Fr)", capLabel: "Penggunaan", typeLabel: "Tipe" },
    }
  }
};

const AddToolModal = ({ isOpen, onClose, onSubmit }) => {
  const [category, setCategory] = useState("MOBILITAS");
  const [toolName, setToolName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    type: "", size: "", dimensions: "", weight_cap: "", 
    stock: "", condition: "baik", image_url: "", description: "",
  });

  useEffect(() => {
    if(!isOpen) {
       setCategory("MOBILITAS");
       setToolName("");
       setFormData({type: "", size: "", dimensions: "", weight_cap: "", stock: "", condition: "baik", image_url: "", description: ""});
       setIsSubmitting(false);
    }
  }, [isOpen]);

  const getLabels = () => {
    const catData = TOOL_PRESETS[category];
    if (catData && catData.specs[toolName]) return catData.specs[toolName];
    return { sizeLabel: "Ukuran", capLabel: "Kapasitas/Beban", typeLabel: "Tipe/Varian" };
  };
  const labels = getLabels();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { alert("Maks 2MB"); return; }
      const reader = new FileReader();
      reader.onloadend = () => setFormData({ ...formData, image_url: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!toolName || !formData.stock) return;

    setIsSubmitting(true); 

    try {
        await onSubmit({
            name: toolName,
            category_id: category.toLowerCase(),
            type: formData.type,
            size: formData.size,
            dimensions: formData.dimensions,
            weight_cap: formData.weight_cap,
            description: formData.description,
            condition: formData.condition,
            stock: parseInt(formData.stock),
            status: "tersedia",
            image_url: formData.image_url,
        });
    } catch (error) {
        console.error(error);
    } finally {
        setIsSubmitting(false); 
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 relative overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h3 className="text-xl font-bold text-gray-900">Tambah Alat Medis</h3>
            <button onClick={onClose} disabled={isSubmitting} className="text-gray-400 hover:text-gray-600"><X className="w-6 h-6" /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4 bg-teal-50 p-4 rounded-lg border border-teal-100">
                <div className="form-control">
                    <label className="label-text text-sm font-bold text-teal-800 mb-1 block">Kategori</label>
                    <select defaultValue="Color scheme" value={category} onChange={(e) => { setCategory(e.target.value); setToolName(""); }} className="select select-accent h-8 bg-white px-2">
                        {Object.keys(TOOL_PRESETS).map(k => <option key={k} value={k}>{k}</option>)}
                    </select>
                </div>
                <div className="form-control">
                    <label className="label-text text-sm font-bold text-teal-800 mb-1 block">Nama Alat</label>
                    <select defaultValue="Color scheme" value={toolName} onChange={(e) => setToolName(e.target.value)} className="select select-accent h-8 bg-white px-2">
                        <option value="">-- Pilih Alat --</option>
                        {TOOL_PRESETS[category].types.map(t => <option key={t} value={t}>{t}</option>)}
                        <option value="Lainnya">Lainnya</option>
                    </select>
                    {toolName === "Lainnya" && <input type="text" className="input input-bordered input-sm w-full mt-2" placeholder="Nama alat..." onChange={(e) => setToolName(e.target.value)} />}
                </div>
            </div>

            <div className="space-y-4">
                <h4 className="text-sm font-bold text-gray-700 border-b border-gray-300 pb-2">Detail Spesifikasi</h4>
                <div className="grid grid-cols-2 gap-4">
                    <div className="form-control">
                        <label className="label-text text-sm font-semibold text-gray-500 mb-1">{labels.typeLabel}</label>
                        <input type="text" value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} className="input input-bordered border-gray-300 w-full h-8 px-2" required />
                    </div>
                    <div className="form-control">
                        <label className="label-text text-sm font-semibold text-gray-500 mb-1">{labels.sizeLabel}</label>
                        <input type="text" value={formData.size} onChange={(e) => setFormData({...formData, size: e.target.value})} className="input input-bordered border-gray-300 w-full h-8 px-2" />
                    </div>
                    <div className="form-control">
                        <label className="label-text text-sm font-semibold text-gray-500 mb-1">{labels.capLabel}</label>
                        <input type="text" value={formData.weight_cap} onChange={(e) => setFormData({...formData, weight_cap: e.target.value})} className="input input-bordered border-gray-300 w-full h-8 px-2" />
                    </div>
                    <div className="form-control">
                        <label className="label-text text-sm font-semibold text-gray-500 mb-1 ">Stok Awal</label>
                        <input type="number" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} className="input input-bordered border-gray-300 w-full h-8 px-2" required />
                    </div>
                </div>
                <div className="form-control">
                    <label className="label-text text-sm font-semibold text-gray-500 mb-1">Deskripsi / Dimensi</label>
                    <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="textarea textarea-bordered border-gray-300 w-full px-2" rows={2}></textarea>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
                 <div className="form-control">
                    <label className="label-text text-sm font-semibold text-gray-500 mb-1">Kondisi</label>
                    <select value={formData.condition} onChange={(e) => setFormData({...formData, condition: e.target.value})} className="select h-8 bg-white px-2 border-gray-300 w-full">
                        <option value="baik">Baik</option>
                        <option value="rusak ringan">Rusak Ringan</option>
                    </select>
                </div>
                <div className="form-control">
                    <label className="label-text text-sm font-semibold text-gray-500 mb-1">Upload Gambar</label>
                    <input type="file" className="file-input file-input-bordered file-input-sm border-gray-300 w-full h-8 px-2" onChange={handleImageUpload} accept="image/*" />
                    {formData.image_url && <img src={formData.image_url} alt="Preview" className="h-10 w-10 mt-2 rounded object-cover" />}
                </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-300">
                <button type="button" onClick={onClose} disabled={isSubmitting} className="btn btn-ghost border border-gray-300 w-16 rounded-lg hover:bg-gray-200">Batal</button>
                <button type="submit" disabled={isSubmitting} className="btn btn-primary bg-teal-600 hover:bg-teal-700 border-none rounded-lg text-white px-8">
                    {isSubmitting ? <span className="loading loading-spinner"></span> : "Simpan Data"}
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default AddToolModal;