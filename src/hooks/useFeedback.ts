
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { feedbackApi } from '@/services/api';
import { toast } from '@/hooks/use-toast';

export const useFeedback = () => {
  return useQuery({
    queryKey: ['feedback'],
    queryFn: () => feedbackApi.getAllFeedback().then(res => res.data),
  });
};

export const useFeedbackStats = () => {
  return useQuery({
    queryKey: ['feedback-stats'],
    queryFn: () => feedbackApi.getFeedbackStats().then(res => res.data),
  });
};

export const useCreateFeedback = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: feedbackApi.createFeedback,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedback'] });
      queryClient.invalidateQueries({ queryKey: ['feedback-stats'] });
      toast({
        title: "Success",
        description: "Feedback submitted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to submit feedback",
        variant: "destructive",
      });
    },
  });
};
