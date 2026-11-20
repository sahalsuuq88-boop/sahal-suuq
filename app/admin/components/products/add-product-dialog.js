"use client";

import React, { useEffect, useState } from "react";

export default function AddProductDialog({
  visible,
  setVisible,
  create,
  getAll,
}) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
  });

  const [units, setUnits] = useState([]);

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!visible) {
      setForm({
        name: "",
        category: "",
        price: "",
        stock: "",
        description: "",
      });

      setUnits([]);
      setImage(null);
    }
  }, [visible]);

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Add new unit
  const addUnit = () => {
    setUnits((prev) => [
      ...prev,
      {
        name: "",
        price: "",
      },
    ]);
  };

  // Update unit
  const updateUnit = (index, field, value) => {
    setUnits((prev) =>
      prev.map((unit, i) =>
        i === index
          ? {
              ...unit,
              [field]: value,
            }
          : unit,
      ),
    );
  };

  // Remove unit
  const removeUnit = (index) => {
    setUnits((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.category.trim() ||
      !form.price ||
      !form.stock
    ) {
      alert("Please fill all required fields.");
      return;
    }

    // Validate units
    const cleanedUnits = units
      .map((unit) => ({
        name: unit.name.trim(),
        price: Number(unit.price),
      }))
      .filter((unit) => unit.name && unit.price >= 0);

    if (units.length > 0 && cleanedUnits.length !== units.length) {
      alert("Please complete all unit names and prices.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", form.name.trim());
      formData.append("category", form.category.trim());
      formData.append("description", form.description.trim());
      formData.append("price", String(form.price));
      formData.append("stock", String(form.stock));

      // Send units as JSON
      formData.append("units", JSON.stringify(cleanedUnits));

      if (image) {
        formData.append("image", image);
      }

      await create(formData);

      if (getAll) {
        await getAll();
      }

      setForm({
        name: "",
        category: "",
        price: "",
        stock: "",
        description: "",
      });

      setUnits([]);
      setImage(null);
      setVisible(false);

      alert("Product created successfully.");
    } catch (error) {
      console.error(
        "Create product error:",
        error?.response?.data || error?.message,
      );

      alert(error?.response?.data?.message || "Failed to create product.");
    } finally {
      setLoading(false);
    }
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 px-4 py-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !loading) {
          setVisible(false);
        }
      }}
    >
      {" "}
      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* HEADER */}{" "}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
          {" "}
          <div>
            {" "}
            <h2 className="text-xl font-bold text-[#222]">Add Product </h2>
            <p className="mt-1 text-xs text-gray-500">
              Add a new product to your store.
            </p>
          </div>
          <button
            type="button"
            onClick={() => !loading && setVisible(false)}
            disabled={loading}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-xl text-gray-600 transition hover:bg-gray-200 disabled:opacity-50"
          >
            ×
          </button>
        </div>
        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="max-h-[80vh] overflow-y-auto px-6 py-5"
        >
          {/* NAME */}
          <div className="mb-4">
            <label className="mb-2 block text-sm font-semibold text-[#333]">
              Product Name
            </label>

            <input
              type="text"
              placeholder="Bariis Basmati"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              className="h-11 w-full rounded-lg border border-[#E5E1DA] bg-[#FAFAFA] px-3 text-sm text-[#222] outline-none transition focus:border-[#C8A96E] focus:ring-2 focus:ring-[#C8A96E]/20"
            />
          </div>

          {/* CATEGORY */}
          <div className="mb-4">
            <label className="mb-2 block text-sm font-semibold text-[#333]">
              Category
            </label>

            <input
              type="text"
              placeholder="Rice"
              value={form.category}
              onChange={(e) => updateField("category", e.target.value)}
              className="h-11 w-full rounded-lg border border-[#E5E1DA] bg-[#FAFAFA] px-3 text-sm text-[#222] outline-none transition focus:border-[#C8A96E] focus:ring-2 focus:ring-[#C8A96E]/20"
            />
          </div>

          {/* DESCRIPTION */}
          <div className="mb-4">
            <label className="mb-2 block text-sm font-semibold text-[#333]">
              Description
            </label>

            <textarea
              placeholder="Write product description..."
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              rows={4}
              className="w-full resize-none rounded-lg border border-[#E5E1DA] bg-[#FAFAFA] px-3 py-3 text-sm text-[#222] outline-none transition focus:border-[#C8A96E] focus:ring-2 focus:ring-[#C8A96E]/20"
            />
          </div>

          {/* PRICE + STOCK */}
          <div className="grid grid-cols-2 gap-3">
            <div className="mb-4">
              <label className="mb-2 block text-sm font-semibold text-[#333]">
                Price
              </label>

              <input
                type="number"
                placeholder="1"
                min="0"
                step="0.01"
                value={form.price}
                onChange={(e) => updateField("price", e.target.value)}
                className="h-11 w-full rounded-lg border border-[#E5E1DA] bg-[#FAFAFA] px-3 text-sm text-[#222] outline-none focus:border-[#C8A96E] focus:ring-2 focus:ring-[#C8A96E]/20"
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-sm font-semibold text-[#333]">
                Stock
              </label>

              <input
                type="number"
                placeholder="25"
                min="0"
                value={form.stock}
                onChange={(e) => updateField("stock", e.target.value)}
                className="h-11 w-full rounded-lg border border-[#E5E1DA] bg-[#FAFAFA] px-3 text-sm text-[#222] outline-none focus:border-[#C8A96E] focus:ring-2 focus:ring-[#C8A96E]/20"
              />
            </div>
          </div>

          {/* UNITS */}
          <div className="mb-5">
            <div className="mb-2 flex items-center justify-between">
              <div>
                <label className="block text-sm font-semibold text-[#333]">
                  Units
                </label>

                <p className="mt-1 text-xs text-gray-500">
                  Add different units and their prices.
                </p>
              </div>

              <button
                type="button"
                onClick={addUnit}
                disabled={loading}
                className="rounded-lg bg-[#F5EFE5] px-3 py-2 text-xs font-semibold text-[#2D2417] transition hover:bg-[#EDE3D3]"
              >
                + Add Unit
              </button>
            </div>

            {units.length === 0 ? (
              <div className="rounded-xl border border-dashed border-gray-300 bg-[#FAFAFA] px-4 py-4 text-center">
                <p className="text-xs text-gray-500">No units added.</p>

                <p className="mt-1 text-[11px] text-gray-400">
                  Example: Mid-mid, Half, Kiish
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {units.map((unit, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-[#E5E1DA] bg-[#FAFAFA] p-3"
                  >
                    <div className="grid grid-cols-[1fr_110px_auto] items-end gap-2">
                      <div>
                        <label className="mb-1 block text-[11px] font-medium text-gray-500">
                          Unit
                        </label>

                        <input
                          type="text"
                          placeholder="Mid-mid"
                          value={unit.name}
                          onChange={(e) =>
                            updateUnit(index, "name", e.target.value)
                          }
                          className="h-10 w-full rounded-lg border border-[#E5E1DA] bg-white px-3 text-sm text-[#222] outline-none focus:border-[#C8A96E] focus:ring-2 focus:ring-[#C8A96E]/20"
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-[11px] font-medium text-gray-500">
                          Price
                        </label>

                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          placeholder="1"
                          value={unit.price}
                          onChange={(e) =>
                            updateUnit(index, "price", e.target.value)
                          }
                          className="h-10 w-full rounded-lg border border-[#E5E1DA] bg-white px-3 text-sm text-[#222] outline-none focus:border-[#C8A96E] focus:ring-2 focus:ring-[#C8A96E]/20"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => removeUnit(index)}
                        disabled={loading}
                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-lg text-red-500 transition hover:bg-red-100"
                        title="Remove unit"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* IMAGE */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-semibold text-[#333]">
              Product Image
            </label>

            <label className="flex min-h-[150px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-gray-300 bg-[#FAFAFA] transition hover:bg-gray-50">
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Product preview"
                  className="h-[150px] w-full object-cover"
                />
              ) : (
                <>
                  <span className="text-4xl text-gray-400">☁</span>

                  <span className="mt-2 text-sm text-gray-500">
                    Select Product Image
                  </span>

                  <span className="mt-1 text-xs text-gray-400">
                    Click to upload
                  </span>
                </>
              )}

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];

                  if (file) {
                    setImage(file);
                  }
                }}
              />
            </label>

            {image && (
              <button
                type="button"
                onClick={() => setImage(null)}
                className="mt-2 text-xs font-medium text-red-600 hover:text-red-700"
              >
                Remove image
              </button>
            )}
          </div>

          {/* SAVE */}
          <button
            type="submit"
            disabled={loading}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#2D2417] text-sm font-semibold text-white transition hover:bg-[#3a3021] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Saving...
              </>
            ) : (
              <>
                <span className="text-xl leading-none">+</span>
                Save Product
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
