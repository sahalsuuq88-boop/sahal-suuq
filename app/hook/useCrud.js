import { useState } from "react";
import useApi from "./useApi";

function useCrud(service) {
  const { loading, error, request } = useApi();

  const [items, setItems] = useState([]);

  // =========================
  // GET ALL
  // =========================
  const getAll = async (...args) => {
    const data = await request(() => service.getAll(...args));

    // console.log("get all data:", data);

    if (Array.isArray(data)) {
      setItems(data);
    } else {
      setItems(
        data?.products ||
          data?.categories ||
          data?.users ||
          data?.orders ||
          data?.customers ||
          data?.wishlist ||
          data?.notifications ||
          data?.data ||
          [],
      );
    }

    return data;
  };

  // =========================
  // GET ONE
  // =========================
  const getOne = async (id) => {
    const data = await request(() => service.getOne(id));

    return data;
  };

  // =========================
  // CREATE
  // =========================
  const create = async (body) => {
    const data = await request(() => service.create(body));

    setItems((prev) => [...(Array.isArray(prev) ? prev : []), data]);

    return data;
  };

  // =========================
  // UPDATE
  // =========================
  const update = async (id, data) => {
    const updatedProduct = await request(() => service.update(id, data));

    setItems((prev) =>
      Array.isArray(prev)
        ? prev.map((item) => (item?._id === id ? updatedProduct : item))
        : prev,
    );

    return updatedProduct;
  };

  // =========================
  // DELETE
  // =========================
  const remove = async (id) => {
    try {
      await request(() => service.remove(id));

      setItems((prev) =>
        Array.isArray(prev) ? prev.filter((item) => item?._id !== id) : [],
      );
    } catch (err) {
      console.log("Delete error:", err);
      throw err;
    }
  };

  // =========================
  // CUSTOM ACTION
  // =========================
  const action = async (method, ...args) => {
    if (!service[method]) {
      throw new Error(`${method} does not exist in service`);
    }

    return await request(() => service[method](...args));
  };

  return {
    items,
    setItems,

    loading,
    error,

    getAll,
    getOne,
    create,
    update,
    remove,
    action,
  };
}

export default useCrud;
