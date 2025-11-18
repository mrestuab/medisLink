import React, { useState } from "react";
import { X } from "lucide-react";

const AddToolModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    category_id: "mobilitas",
    description: "",
    condition: "baik",
    stock: "",
    image_url: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.stock) return;

    onSubmit({
      name: formData.name,
      category_id: formData.category_id,
      description: formData.description,
      condition: formData.condition,
      stock: parseInt(formData.stock),
      status: "tersedia",
      image_url: formData.image_url || "https://placehold.co/400",
    });

    setFormData({
      name: "",
      category_id: "mobilitas",
      description: "",
      condition: "baik",
      stock: "",
      image_url: "",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 relative 
        animate-in fade-in-50 zoom-in-50 duration-200 border border-gray-100">

        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">Tambah Alat Medis</h3>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-700 hover:scale-110 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="form-control">
            <label className="label-text text-xs font-bold text-gray-500 mb-1 block">Nama Alat</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input w-full rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 px-4"
              placeholder="Contoh: Kursi Roda Standar"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label-text text-xs font-bold text-gray-500 mb-1 block">Kategori</label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                className="select select-bordered w-full rounded-lg bg-white px-4 focus:bg-white focus:ring-2 focus:ring-teal-400 focus:border-teal-400"
              >
                <option value="mobilitas">Mobilitas</option>
                <option value="rehabilitasi">Rehabilitasi</option>
                <option value="pernapasan">Pernapasan</option>
                <option value="umum">Umum</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label-text text-xs font-bold text-gray-500 mb-1 block">Stok Awal</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="input w-full rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 px-4"
                placeholder="0"
                min="1"
                required
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label-text text-xs font-bold text-gray-500 mb-1 block">Kondisi Alat</label>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className="select select-bordered w-full rounded-xl bg-white focus:bg-white focus:ring-2 focus:ring-teal-400 focus:border-teal-400 px-4"
            >
              <option value="baik">Baik</option>
              <option value="rusak ringan">Rusak Ringan</option>
              <option value="rusak berat">Rusak Berat</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label-text text-xs font-bold text-gray-500 mb-1 block">URL Gambar</label>
            <input
              type="text"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              className="input w-full rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 px-4"
              placeholder="https://..."
            />
          </div>

          <div className="form-control">
            <label className="label-text text-xs font-bold text-gray-500 mb-1 block">Deskripsi</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="textarea textarea-bordered w-full rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 p-4"
              placeholder="Deskripsi alat..."
              rows={3}
            ></textarea>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-4 py-2 rounded-lg border hover:bg-gray-100 transition"
            >
              Batal
            </button>

            <button 
              type="submit" 
              className="px-5 py-2 rounded-lg bg-teal-500 text-white font-semibold shadow hover:bg-teal-600 active:scale-95 transition"
            >
              Simpan Data
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddToolModal;
