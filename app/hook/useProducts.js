"use client";

import useCrud from "./useCrud";
import productService from "../services/product";

export default function useProducts() {
  const crud = useCrud(productService);

  const getAllAdmin = async (...args) => {
    const data = await crud.action("getAllAdmin", ...args);

    if (Array.isArray(data)) {
      crud.setItems(data);
    } else {
      crud.setItems(
        data?.products ||
          data?.data ||
          []
      );
    }

    return data;
  };

  return {
    ...crud,
    getAllAdmin,
  };
}