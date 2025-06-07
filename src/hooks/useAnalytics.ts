
import { useQuery } from '@tanstack/react-query';
import { analyticsApi } from '@/services/api';

export const useDashboardMetrics = () => {
  return useQuery({
    queryKey: ['dashboard-metrics'],
    queryFn: () => analyticsApi.getDashboardMetrics().then(res => res.data),
    refetchInterval: 30000, // Refetch every 30 seconds for real-time data
  });
};

export const useProductMovement = () => {
  return useQuery({
    queryKey: ['product-movement'],
    queryFn: () => analyticsApi.getProductMovement().then(res => res.data),
  });
};

export const useExpiryAlerts = () => {
  return useQuery({
    queryKey: ['expiry-alerts'],
    queryFn: () => analyticsApi.getExpiryAlerts().then(res => res.data),
  });
};

export const useDefectTracing = () => {
  return useQuery({
    queryKey: ['defect-tracing'],
    queryFn: () => analyticsApi.getDefectTracing().then(res => res.data),
  });
};
