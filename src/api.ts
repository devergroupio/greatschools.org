import axios from "axios";
import { notification } from "antd";
import _ from "lodash";
const api = axios.create({
  baseURL: "/api"
});

export const API$search = async (query, page = 1) => {
  const {
    data: {
      searchResults: { listResults },
      searchList
    }
  } = await api.get("/search", {
    params: {
      query,
      page
    }
  });
  const totalPages = _.get(searchList, "totalPages");
  const totalResultCount = _.get(searchList, "totalResultCount");
  const resultsPerPage = _.get(searchList, "resultsPerPage");

  return {
    totalPages,
    totalResultCount,
    resultsPerPage,
    results: listResults
  };
};

export const API$detail = async id => {
  const { data } = await api.get("/detail", {
    params: {
      id
    }
  });
  return data;
};
