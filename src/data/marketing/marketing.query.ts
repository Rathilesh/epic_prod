import {
  QueryParamsType,
  MarketingQueryOptionsType,
} from "@ts-types/custom.types";
import { mapPaginatorData, stringifySearchQuery } from "@utils/data-mappers";
import { useQuery } from "react-query";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import marketing from "@repositories/marketing";

const fetchMarketing = async ({ queryKey }: QueryParamsType) => {
  const [_key, params] = queryKey;
  const {
    page,
    text,
    limit = 15,
    orderBy = "updated_at",
    sortedBy = "DESC",
  } = params as MarketingQueryOptionsType;
  const searchString = stringifySearchQuery({
    name: text,
    status,
  });
  const url = `${API_ENDPOINTS.MARKETING}?search=${searchString}&searchJoin=and&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
  const {
    data: { data, ...rest },
  } = await marketing.all(url);
  return { marketing: { data, paginatorInfo: mapPaginatorData({ ...rest }) } };
};

const useMarketingQuery = (
  params: MarketingQueryOptionsType,
  options: any = {}
) => {
  return useQuery<any, Error>([API_ENDPOINTS.MARKETING, params], fetchMarketing, {
    ...options,
    keepPreviousData: true,
  });
};

export { useMarketingQuery, fetchMarketing };
