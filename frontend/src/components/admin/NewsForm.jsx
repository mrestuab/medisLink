import React, { useState } from "react";

const NewsForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onSubmit(title, content);
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="form-control">
        <label className="label-text text-xs font-bold text-gray-500 mb-1 block">
          Judul
        </label>
        <div className="w-full border border-gray-300 rounded-lg px-3 py-2 focus-within:border-teal-500">
          <input
            type="text"
            placeholder="Judul berita"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full outline-none border-none bg-transparent text-sm"
          />
        </div>
      </div>

      <div className="form-control">
        <label className="label-text text-xs font-bold text-gray-500 mb-1 block">
          Konten
        </label>
        <div className="w-full border border-gray-300 rounded-lg px-3 py-2 focus-within:border-teal-500">
          <textarea
            rows={5}
            placeholder="Konten berita"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full outline-none border-none bg-transparent text-sm resize-none"
          />
        </div>
      </div>

      <button
        type="submit"
        className="btn w-full bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold shadow-lg shadow-teal-100 mt-2"
      >
        Publikasikan
      </button>
    </form>

  );
};

export default NewsForm;
