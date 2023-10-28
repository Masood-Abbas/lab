import api from "@/utils/axios";

export function loginUser(params) {
  return new Promise((resolve, reject) => {
    api
      .post("user/login", params)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}