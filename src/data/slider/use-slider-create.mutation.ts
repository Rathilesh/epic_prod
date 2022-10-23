import { CreateSliderInput } from "@ts-types/generated";
import { ROUTES } from "@utils/routes";
import Slider from "@repositories/slider";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { API_ENDPOINTS } from "@utils/api/endpoints";

export interface ISliderCreateVariables {
  variables: {
    input: CreateSliderInput;
  };
}

export const useCreateSliderMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    ({ variables: { input } }: ISliderCreateVariables) =>
    Slider.create(API_ENDPOINTS.SLIDERS, input),
    {
      onSuccess: () => {
        router.push(ROUTES.SLIDERS);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.SLIDERS);
      },
    }
  );
};
