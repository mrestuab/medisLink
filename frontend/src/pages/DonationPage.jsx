import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Image as ImageIcon, X, UploadCloud, MapPin, Package, Calendar, AlertCircle, CheckCircle } from "lucide-react";
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
    const [isSuccess, setIsSuccess] = useState(false); 
    const [errorMessage, setErrorMessage] = useState("");

    const [formData, setFormData] = useState({
        tool_name: "",
        category: TOOL_CATEGORIES[0],
        quantity: 1,
        description: "",
        pickup_address: "",
        pickup_date: "", 
    });

    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrorMessage("");
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
                setErrorMessage("");
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setImageFile(null);
        setPreviewUrl("");
    };

    const getToday = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        if (!imageFile) {
            setErrorMessage("Mohon sertakan foto alat medis agar memudahkan verifikasi.");
            return;
        }

        if (formData.pickup_date < getToday()) {
            setErrorMessage("Tanggal penjemputan tidak boleh kurang dari hari ini.");
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
            dataToSend.append("pickup_date", formData.pickup_date);
            dataToSend.append("image", imageFile); 

            await createDonation(dataToSend);

            setIsSuccess(true);
            
            setTimeout(() => {
                navigate("/dashboard");
            }, 2000);

        } catch (error) {
            console.error("Gagal donasi:", error);
            setErrorMessage("Maaf, terjadi kesalahan saat mengirim data. Coba lagi nanti.");
            setIsSubmitting(false);
        } 
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center animate-in zoom-in duration-300">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-emerald-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Terima Kasih!</h2>
                    <p className="text-gray-500 text-sm mb-6">
                        Donasi Anda berhasil dikirim dan sedang menunggu verifikasi Admin.
                    </p>
                    <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-emerald-500 h-full w-full animate-[progress_2s_ease-in-out]"></div>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Mengalihkan ke dashboard...</p>
                </div>
            </div>
        );
    }

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
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none"
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
                            </div>
                        ) : (
                            <div className="relative w-full h-64 bg-gray-100 rounded-xl overflow-hidden border border-gray-200 group">
                                <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-lg shadow-md hover:bg-red-600 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label-text text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-teal-600" /> Rencana Tanggal Penjemputan
                            </label>
                            <input 
                                type="date"
                                name="pickup_date"
                                value={formData.pickup_date}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none"
                                required
                                min={getToday()}
                            />
                        </div>

                        <div className="form-control">
                            <label className="label-text text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-teal-600" /> Lokasi Barang
                            </label>
                            <textarea
                                name="pickup_address"
                                value={formData.pickup_address}
                                onChange={handleChange}
                                rows={1}
                                placeholder="Alamat lengkap..."
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none resize-none h-[42px]" 
                                required
                            />
                        </div>
                    </div>

                    {errorMessage && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex items-start gap-3 animate-in slide-in-from-top-2">
                            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="font-bold text-sm">Perhatian</p>
                                <p className="text-sm">{errorMessage}</p>
                            </div>
                        </div>
                    )}

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
                            ) : "Kirim Donasi"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default DonationPage;