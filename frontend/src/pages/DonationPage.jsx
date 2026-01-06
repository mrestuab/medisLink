import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Image as ImageIcon, X, UploadCloud, MapPin, Package } from "lucide-react";
import { createDonation } from "../services/userServices";

const TOOL_CATEGORIES = [
    "Mobilitas (Kursi Roda, Tongkat, dll)",
    "Pernapasan (Tabung Oksigen, Nebulizer)",
    "Rehabilitasi (Kasur Decubitus, dll)",
    "P3K & Medis Dasar",
    "Lainnya"
];

const DonationPage = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        tool_name: "",
        category: TOOL_CATEGORIES[0],
        quantity: 1,
        description: "",
        pickup_address: "",
    });

    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                alert("Ukuran gambar maksimal 2MB!");
                return;
            }
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setPreviewUrl(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setImageFile(null);
        setPreviewUrl("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!imageFile) {
            alert("Mohon sertakan foto alat medis agar memudahkan verifikasi.");
            return;
        }

        setIsSubmitting(true);

        try {
            const dataToSend = new FormData();
            dataToSend.append("tool_name", formData.tool_name);
            dataToSend.append("category", formData.category);
            dataToSend.append("quantity", formData.quantity);
            dataToSend.append("description", formData.description);
            dataToSend.append("pickup_address", formData.pickup_address);
            dataToSend.append("image", imageFile); 

            await createDonation(dataToSend);
            
            alert("Terima kasih! Donasi Anda berhasil dikirim dan menunggu verifikasi Admin.");
            navigate("/dashboard"); 
            
        } catch (error) {
            console.error("Gagal donasi:", error);
            alert("Maaf, terjadi kesalahan saat mengirim data. Coba lagi nanti.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-teal-600 px-8 py-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Package className="w-6 h-6" /> Form Donasi Alat Medis
                    </h2>
                    <p className="text-teal-100 mt-1 text-sm">
                        Bantuan Anda sangat berarti bagi mereka yang membutuhkan.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="px-8 py-8 space-y-6">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label-text text-sm font-bold text-gray-700 mb-2 block">
                                Nama Alat Medis
                            </label>
                            <input
                                type="text"
                                name="tool_name"
                                value={formData.tool_name}
                                onChange={handleChange}
                                placeholder="Contoh: Kursi Roda Bekas"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label-text text-sm font-bold text-gray-700 mb-2 block">
                                Kategori
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none bg-white"
                            >
                                {TOOL_CATEGORIES.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 form-control">
                            <label className="label-text text-sm font-bold text-gray-700 mb-2 block">
                                Deskripsi Kondisi & Spesifikasi
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={3}
                                placeholder="Jelaskan kondisi alat (misal: lecet pemakaian, fungsi normal, merk, dll)..."
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none resize-none"
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label-text text-sm font-bold text-gray-700 mb-2 block">
                                Jumlah (Unit)
                            </label>
                            <input
                                type="number"
                                name="quantity"
                                min="1"
                                value={formData.quantity}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none font-bold text-center"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label-text text-sm font-bold text-gray-700 mb-2 block">
                            Foto Alat (Wajib)
                        </label>
                        
                        {!previewUrl ? (
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-teal-50 hover:border-teal-300 transition-all cursor-pointer relative group">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <div className="bg-white p-3 rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
                                    <UploadCloud className="w-6 h-6 text-teal-600" />
                                </div>
                                <p className="text-sm text-gray-500 font-medium">Klik untuk upload atau drag & drop</p>
                                <p className="text-xs text-gray-400 mt-1">Format: JPG, PNG (Max 2MB)</p>
                            </div>
                        ) : (
                            <div className="relative w-full h-64 bg-gray-100 rounded-xl overflow-hidden border border-gray-200 group">
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    className="w-full h-full object-contain"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button
                                        type="button"
                                        onClick={handleRemoveImage}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all"
                                    >
                                        <X className="w-4 h-4" /> Ganti Foto
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="form-control">
                        <label className="label-text text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-teal-600" /> Alamat Penjemputan / Lokasi Barang
                        </label>
                        <textarea
                            name="pickup_address"
                            value={formData.pickup_address}
                            onChange={handleChange}
                            rows={2}
                            placeholder="Alamat lengkap tempat barang berada (untuk verifikasi admin)..."
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none resize-none"
                            required
                        />
                    </div>

                    <div className="pt-6 border-t border-gray-100 flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="px-6 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 font-medium transition-colors"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-8 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold shadow-lg shadow-teal-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 transition-all"
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="loading loading-spinner loading-sm"></span> Mengirim...
                                </>
                            ) : (
                                "Kirim Donasi"
                            )}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default DonationPage;