"use client";

import useCrud from "./useCrud";
import categoryService from "../services/category";


export default function usecategory(){

    return useCrud(categoryService);

}