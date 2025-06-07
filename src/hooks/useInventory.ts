
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { inventoryApi } from '@/services/api';
import { toast } from '@/hooks/use-toast';

export const useInventory = () => {
  return useQuery({
    queryKey: ['inventory'],
    queryFn: () => inventoryApi.getAllInventory().then(res => res.data),
  });
};

export const useLowStockItems = () => {
  return useQuery({
    queryKey: ['low-stock'],
    queryFn: () => inventoryApi.getLowStockItems().then(res => res.data),
  });
};

export const useExpiringItems = () => {
  return useQuery({
    queryKey: ['expiring-items'],
    queryFn: () => inventoryApi.getExpiringItems().then(res => res.data),
  });
};

export const useUpdateStock = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, quantity }: { id: string; quantity: number }) => 
      inventoryApi.updateStock(id, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory'] });
      queryClient.invalidateQueries({ queryKey: ['low-stock'] });
      toast({
        title: "Success",
        description: "Stock updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update stock",
        variant: "destructive",
      });
    },
  });
};
