import api from "@/utils/axios";

export function getBasicDetailOfPatient() {
  return new Promise((resolve, reject) => {
    api
      .get(`patient`)
      .then((res) => {
        resolve(res?.data); 
      })
      .catch((err) => {
        reject(err); 
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

export function updateRequest(params) {
  return new Promise((resolve, reject) => {
    api
      .patch(`patient/${params?.id}`, params)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
