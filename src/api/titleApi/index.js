import api from "@/utils/axios";

export function getTitle() {
  return new Promise((resolve, reject) => {
    api
      .get(`titles`)
      .then((res) => {
        resolve(res?.data); // Resolve the promise with the data
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function createTitle(params) {
  return new Promise((resolve, reject) => {
    api
      .post("titles", params)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function updateTitle(params) {
  return new Promise((resolve, reject) => {
    api
      .patch(`titles/${params?.id}`, params)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function deleteTitle(params) {
  return new Promise((resolve, reject) => {
    api
      .delete(`titles/${params}`, params)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function searchTitle(params) {
  return new Promise((resolve, reject) => {
    api
      .get(`titles/search?name=${params?.name}`)
      .then((res) => {
        resolve(res?.data); // Resolve the promise with the data
      })
      .catch((err) => {
        reject(err);
      });
  });
}
