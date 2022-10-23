import { useMutation, useQueryClient } from "react-query";
import Slider from "@repositories/slider";
import { API_ENDPOINTS } from "@utils/api/endpoints";

export const useDeleteSliderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) => Slider.delete(`${API_ENDPOINTS.SLIDERS}/${id}`),
    {
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.SLIDERS);
      },
    }
  );
};
