import React, { useState } from "react";
import { Image as ImageIcon, X, AlertCircle } from "lucide-react";

const NewsForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { 
        setErrorMessage("Ukuran gambar maksimal 2MB");
        return;
      }
      setErrorMessage(""); 
      setImageFile(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setPreviewUrl("");
  };

  const submit = (e) => {
    e.preventDefault();
    setErrorMessage(""); 

    if (!title.trim()) {
        setErrorMessage("Judul berita wajib diisi!");
        return;
    }
    if (!content.trim()) {
        setErrorMessage("Konten berita tidak boleh kosong!");
        return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    
    if (imageFile) {
        formData.append("image", imageFile); 
    }

    onSubmit(formData);

    setTitle("");
    setContent("");
    clearImage();
    setErrorMessage("");
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      
      <div className="form-control">
        <label className="label-text text-xs font-bold text-gray-500 mb-1 block">
          Judul Berita
        </label>
        <div className="w-full border border-gray-300 rounded-lg px-3 py-2 focus-within:border-teal-500 bg-white transition-all">
          <input
            type="text"
            placeholder="Contoh: Kegiatan Donor Darah 2024"
            value={title}
            onChange={(e) => { setTitle(e.target.value); setErrorMessage(""); }}
            className="w-full outline-none border-none bg-transparent text-sm"
          />
        </div>
      </div>

      <div className="form-control">
        <label className="label-text text-xs font-bold text-gray-500 mb-1 block">
          Gambar Utama (Opsional)
        </label>
        
        {!previewUrl ? (
            <div className="w-full border border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative group">
                <input 
                    type="file" 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleImageChange}
                    accept="image/*"
                />
                <div className="bg-white p-3 rounded-full shadow-sm mb-2 group-hover:scale-110 transition-transform">
                    <ImageIcon className="w-6 h-6 text-teal-500" />
                </div>
                <span className="text-xs text-gray-500 font-medium">Klik untuk upload gambar</span>
                <span className="text-[10px] text-gray-400 mt-1">Maks. 2MB (JPG/PNG)</span>
            </div>
        ) : (
            <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-200 group shadow-sm">
                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                        type="button"
                        onClick={clearImage}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-xs font-bold transition-transform hover:scale-105"
                    >
                        <X className="w-4 h-4" /> Hapus Gambar
                    </button>
                </div>
            </div>
        )}
      </div>

      <div className="form-control">
        <label className="label-text text-xs font-bold text-gray-500 mb-1 block">
          Konten Berita
        </label>
        <div className="w-full border border-gray-300 rounded-lg px-3 py-2 focus-within:border-teal-500 bg-white transition-all">
          <textarea
            rows={6}
            placeholder="Tulis detail berita lengkap di sini..."
            value={content}
            onChange={(e) => { setContent(e.target.value); setErrorMessage(""); }}
            className="w-full outline-none border-none bg-transparent text-sm resize-none leading-relaxed"
          />
        </div>
      </div>

      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-start gap-3 animate-in fade-in slide-in-from-top-1">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p className="text-sm font-medium">{errorMessage}</p>
        </div>
      )}

      <button
        type="submit"
        className="btn w-full bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-bold shadow-md hover:shadow-lg transition-all mt-2 border-none normal-case h-12"
      >
        Publikasikan Berita
      </button>
    </form>
  );
};

export default NewsForm;