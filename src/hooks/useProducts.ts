
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productApi } from '@/services/api';
import { toast } from '@/hooks/use-toast';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => productApi.getAllProducts().then(res => res.data),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductById(id).then(res => res.data),
    enabled: !!id,
  });
};

export const useTrackProduct = (barcode: string) => {
  return useQuery({
    queryKey: ['track-product', barcode],
    queryFn: () => productApi.trackProduct(barcode).then(res => res.data),
    enabled: !!barcode,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: productApi.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: "Success",
        description: "Product created successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create product",
        variant: "destructive",
      });
    },
  });
};
