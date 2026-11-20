"use client";

import { useRef, useState } from "react";
import { X, Upload, Trash2, Loader2, Plus } from "lucide-react";

export default function AddCategoryDialog({
  visible,
  setVisible,
  create,
  getAll,
}) {
  const fileInputRef = useRef(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!visible) return null;

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImage(null);

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setPreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const closeModal = () => {
    if (loading) return;

    setVisible(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Category name is required");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", name.trim());
      formData.append("description", description.trim());

      if (image) {
        formData.append("image", image);
      }

      await create(formData);

      setName("");
      setDescription("");
      removeImage();

      setVisible(false);

      if (getAll) {
        await getAll();
      }
    } catch (error) {
      console.error(
        "Create category error:",
        error?.response?.data || error?.message,
      );

      alert(error?.response?.data?.message || "Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4">
      {" "}
      <div className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-xl">
        {/* HEADER */}{" "}
        <div className="mb-6 flex items-start justify-between">
          {" "}
          <div>
            {" "}
            <h2 className="text-xl font-bold text-[#222]">Add Category </h2>
            <p className="mt-1 text-xs text-[#888]">
              Create a new product category
            </p>
          </div>
          <button
            onClick={closeModal}
            disabled={loading}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F5F5F5] text-[#555]"
          >
            <X size={21} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {/* NAME */}
          <div className="mb-4">
            <label className="mb-2 block text-sm font-semibold text-[#333]">
              Name
            </label>

            <input
              type="text"
              placeholder="e.g. Shoes"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 w-full rounded-xl border border-[#E5E1DA] bg-[#FAFAFA] px-4 text-sm text-[#222] outline-none focus:border-[#C8A96E]"
            />
          </div>

          {/* DESCRIPTION */}
          <div className="mb-4">
            <label className="mb-2 block text-sm font-semibold text-[#333]">
              Description
            </label>

            <textarea
              placeholder="Category description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full resize-none rounded-xl border border-[#E5E1DA] bg-[#FAFAFA] p-4 text-sm text-[#222] outline-none focus:border-[#C8A96E]"
            />
          </div>

          {/* IMAGE */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-semibold text-[#333]">
              Category Image
            </label>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex h-36 w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-[#E5E1DA] bg-[#FAFAFA]"
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <>
                  <Upload size={32} className="text-[#999]" />

                  <span className="mt-2 text-sm text-[#888]">Select Image</span>
                </>
              )}
            </button>

            {image && (
              <button
                type="button"
                onClick={removeImage}
                className="mt-2 flex items-center gap-1.5 text-xs text-red-600"
              >
                <Trash2 size={15} />
                Remove image
              </button>
            )}
          </div>

          {/* SAVE */}
          <button
            type="submit"
            disabled={loading}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#222] text-sm font-semibold text-white transition hover:bg-black disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 size={19} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Plus size={19} />
                Save Category
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
