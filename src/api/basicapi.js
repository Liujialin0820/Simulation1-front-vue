import http from "@/utils/http";

export const getBaiscBar = () => {
  const path = "/simulation01";
  return http.get(path);
};
