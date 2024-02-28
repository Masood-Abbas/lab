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

export function createUser(params) {
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
  console.log(params)
  return new Promise((resolve, reject) => {
    api
      .patch(`user`, params)
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
  params;
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

export function getUserByEmail(email) {
  email;
  return new Promise((resolve, reject) => {
    api
      .get(`user/${email}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
