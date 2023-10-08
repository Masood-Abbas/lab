import api from "@/utils/axios";

export function getBasicDetailOfPatient() {
  return new Promise((resolve, reject) => {
    api
      .get(`patient`)
      .then((res) => {
        resolve(res?.data); // Resolve the promise with the data
      })
      .catch((err) => {
        reject(err); // Reject the promise with the error
      });
  });
}

export function createBasicDetailOfPatient(params) {
  return new Promise((resolve, reject) => {
    api
      .post("patient", params)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function deleteBasicDetailOfPatient(params) {
  return new Promise((resolve, reject) => {
    api
      .delete(`patient/${params}`, params)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
