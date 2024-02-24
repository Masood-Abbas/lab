import api from "@/utils/axios";

export function getReport(params) {
  params;
  return new Promise((resolve, reject) => {
    api
      .post(`download`, params)
      .then((res) => {
        // resolve(res?.data);
        window.open(URL.createObjectURL(res.data));
      })
      .catch((err) => {
        reject(err);
      });
  });
}
