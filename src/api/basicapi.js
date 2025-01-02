import http from "@/utils/http";

export const makeBlackScholesSimulation = (params) => {
  const path = `/simulation01/`;
  return http.get(path, { params });
};

export const getParameters = () => {
  const path = `/simulation01/parameters/`;
  return http.get(path);
};

export const createParameters = (data) => {
  const path = `/simulation01/parameters/`;
  return http.post(path, data); // Use POST for creating new data
};

export const getData = () => {
  const path = `/simulation01/getdata/`;
  return http.get(path);
};
