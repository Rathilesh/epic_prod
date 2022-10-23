import { CreateSliderInput } from "@ts-types/generated";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import Slider from "@repositories/slider";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useTranslation } from "next-i18next";
export interface ISliderUpdateVariables {
  variables: {
    id: string;
    input: CreateSliderInput;
  };
}

export const useUpdateSliderMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation(
    ({ variables: { id, input } }: ISliderUpdateVariables) =>
      Slider.update(`${API_ENDPOINTS.SLIDERS}/${id}`, input),
    {
      onSuccess: () => {
        toast.success(t("common:successfully-updated"));
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.SLIDERS);
      },
    }
  );
};
