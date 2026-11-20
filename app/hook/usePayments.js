"use client";

import useCrud from "./useCrud";
import paymentService from "../services/payment";


export default function usePayments(){

    return useCrud(paymentService);

}