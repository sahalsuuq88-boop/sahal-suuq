"use client";

import useCrud from "./useCrud";
import wishlistService from "../services/wishlist";


export default function useWishlist(){

    return useCrud(wishlistService);

}