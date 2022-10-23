import Slider from "@repositories/slider";
import { useQuery } from "react-query";
import { Slider as TSlider } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";

export const fetchSlider = async (slug: string) => {
  const { data } = await Slider.find(`${API_ENDPOINTS.SLIDERS}/${slug}`);
  return data;
};

export const useSliderQuery = (slug: string) => {
  return useQuery<TSlider, Error>([API_ENDPOINTS.SLIDERS, slug], () =>
    fetchSlider(slug)
  );
};
