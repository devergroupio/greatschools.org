import axios from "axios";
import { notification } from "antd";
import _ from "lodash";
const api = axios.create({
  baseURL: "/api"
});

export const API$search = async (query, page = 1) => {
  const {
    data: { schools, pageSize, totalPages, total }
  } = await api.get("/search", {
    params: {
      query,
      page
    }
  });
  const totalResultCount = total;
  const resultsPerPage = pageSize;

  return {
    totalPages,
    totalResultCount,
    resultsPerPage,
    results: schools
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
