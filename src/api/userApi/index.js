import api from "@/utils/axios";

export function getUser() {
  return new Promise((resolve, reject) => {
    api
      .get(`user`)
      .then((res) => {
        resolve(res?.data); // Resolve the promise with the data
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function create(params) {
  return new Promise((resolve, reject) => {
    api
      .post("user", params)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function updateUser(params) {
  return new Promise((resolve, reject) => {
    api
      .patch(`user/${params?.id}`, params)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function deleteUser(params) {
  return new Promise((resolve, reject) => {
    api
      .delete(`user/${params}`, params)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function searchUser(params) {
  console.log(params);
  return new Promise((resolve, reject) => {
    api
      .get(`user/search?name=${params?.name}`)
      .then((res) => {
        resolve(res?.data); // Resolve the promise with the data
      })
      .catch((err) => {
        reject(err);
      });
  });
}
