import { QueryParamsType, TypesQueryOptionsType } from "@ts-types/custom.types";
import { mapPaginatorData, stringifySearchQuery } from "@utils/data-mappers";
import { useQuery } from "react-query";
import Type from "@repositories/type";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { Slider} from "@ts-types/generated";

export type SlidersPaginator = {
  data: Array<Slider>
  ;
  paginatorInfo: any;
};

const fetchSliders = async ({ queryKey, }: QueryParamsType): Promise<{ types: SlidersPaginator }> => {
  const [_key, params] = queryKey;
  const {
    page,
    text,
    limit = 15,
    orderBy = "updated_at",
    sortedBy = "DESC",
  } = params as TypesQueryOptionsType;
  const searchString = stringifySearchQuery({
    name: text,
  });

  // @ts-ignore
  const queryParams = new URLSearchParams({
    searchJoin: "and",
    orderBy,
    sortedBy,
    limit: limit.toString(),
    ...(page && { page: page.toString() }),
    ...(Boolean(searchString) && { search: searchString }),
  });
  const url = `${API_ENDPOINTS.SLIDERS}?${queryParams.toString()}`;
  const { data: { data, ...rest }, } = await Type.all(url);
  return {
    types: {
      data,
      paginatorInfo: mapPaginatorData({...rest})
    }
  };
};

const useSlidersQuery = (options: TypesQueryOptionsType) => {
  return useQuery<{types: SlidersPaginator}, Error>(
    [API_ENDPOINTS.SLIDERS, options],
    fetchSliders,
    {
      keepPreviousData: true,
    }
  );
};

export { useSlidersQuery, fetchSliders };
