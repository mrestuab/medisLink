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
    <form onSubmit={submit} className="space-y-6">
      <div className="form-control w-full">
        <label className="label px-0 pt-0">
          <span className="label-text font-bold text-gray-700 text-sm">Judul</span>
        </label>
        <input
          type="text"
          placeholder="Judul berita"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="
            input w-full bg-white border-gray-300 
            focus:border-teal-500 focus:ring-2 focus:ring-teal-400
            rounded-lg placeholder:px-2
          "
        />
      </div>

      <div className="form-control w-full">
        <label className="label px-0 pt-0">
          <span className="label-text font-bold text-gray-700 text-sm">Konten</span>
        </label>
        <textarea
          rows={5}
          placeholder="Konten berita"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="
            textarea textarea-bordered w-full bg-white border-gray-300
            focus:border-teal-500 focus:ring-2 focus:ring-teal-400
            rounded-lg text-base placeholder:px-2
          "
        />
      </div>

      <div className="pt-2">
        <button
          className="
            btn bg-teal-600 hover:bg-teal-700 text-white border-none 
            px-8 rounded-lg capitalize font-semibold
          "
        >
          Publikasikan
        </button>
      </div>
    </form>
  );
};

export default NewsForm;
