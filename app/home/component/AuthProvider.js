// components/AuthProvider.js (Samee faylkan)
'use client';
import { initializeAuth } from '@/app/redux/authSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';


export default function AuthProvider({ children }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeAuth());
    }, [dispatch]);

    return <>{children}</>;
}