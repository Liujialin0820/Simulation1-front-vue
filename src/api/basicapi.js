import http from "@/utils/http";

export const getBaiscBar = (name) => {
  const path = `/simulation01?name=${encodeURIComponent(name)}`;
  return http.get(path);
};

// 用于更新 Parameters 的 data
export const updateParameter = (id, key, value) => {
  const path = `/simulation01/${id}/update/`;
  return http.put(path, { key, value });
};
