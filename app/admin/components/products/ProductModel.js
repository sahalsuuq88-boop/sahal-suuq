"use client";

import { useState, useEffect } from "react";

export default function ProductModal({
  open,
  onClose,
  refresh,
  productToEdit,
  create,
  update,
}) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (productToEdit) {
      setForm({
        name: productToEdit.name || "",
        category:
          typeof productToEdit.category === "object"
            ? productToEdit.category.name
            : productToEdit.category,
        price: productToEdit.price || "",
        stock: productToEdit.stock || "",
        description: productToEdit.description || "",
        image: null,
      });
    } else {
      setForm({
        name: "",
        category: "",
        price: "",
        stock: "",
        description: "",
        image: null,
      });
    }
  }, [productToEdit, open]);

  // Handler-ka qabsanaya isbeddelka input-yada
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm((prev) => ({ ...prev, image: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("category", form.category);
      formData.append("price", form.price);
      formData.append("stock", form.stock);
      formData.append("description", form.description);

      if (form.image) {
        formData.append("image", form.image);
      }

      if (productToEdit && productToEdit._id) {
        await update(productToEdit._id, formData);
      } else {
        await create(formData);
      }

      refresh();
      onClose();
    } catch (err) {
      console.error("Failed to save product", err);
      alert("Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-xl w-[500px] p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-6">
          {productToEdit ? "Edit Product" : "Add Product"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 dark:bg-gray-800 dark:border-gray-700"
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 dark:bg-gray-800 dark:border-gray-700"
            required
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 dark:bg-gray-800 dark:border-gray-700"
            required
          />

          <input
            name="category"
            placeholder="Category Name"
            value={form.category}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 dark:bg-gray-800 dark:border-gray-700"
            required
          />

          <input
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 dark:bg-gray-800 dark:border-gray-700"
            required
          />

          <input
            name="image"
            type="file"
            onChange={handleChange}
            className="w-full border rounded-lg p-3 dark:bg-gray-800 dark:border-gray-700"
          />

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="border px-5 py-2 rounded-lg dark:border-gray-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
