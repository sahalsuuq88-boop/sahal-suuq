import { useState, useCallback } from "react";
import dashboardService from "../services/dashboard";

export default function useDashboard() {
  const [stats, setStats] = useState(null);
  const [sales, setSales] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const getStats = useCallback(async () => {
    try {
      setLoading(true);

      const res = await dashboardService.stats();

      setStats(res.data);

      return res.data;

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);


  const getSales = useCallback(async () => {
    try {

      const res = await dashboardService.sales();

      setSales(res.data);

      return res.data;

    } catch(err){
      setError(err.message);
    }
  }, []);


  return {
    stats,
    sales,
    loading,
    error,
    getStats,
    getSales
  };
}