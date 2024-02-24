import api from "@/utils/axios";

export function getPermissions() {
  return new Promise((resolve, reject) => {
    api
      .get(`permission`)
      .then((res) => {
        resolve(res?.data); // Resolve the promise with the data
      })
      .catch((err) => {
        reject(err); // Reject the promise with the error
      });
  });
}


export function getRoles() {
  return new Promise((resolve, reject) => {
    api
      .get(`role`)
      .then((res) => {
        resolve(res?.data); // Resolve the promise with the data
      })
      .catch((err) => {
        reject(err); 
      });
  });
}


export function createRole(params) {
  return new Promise((resolve, reject) => {
    api
      .post("role", params)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function updateRole(params) {
  return new Promise((resolve, reject) => {
    api
      .patch(`role/${params?.id}`, params)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function deleteRole(params) {
  return new Promise((resolve, reject) => {
    api
      .delete(`role/${params}`, params)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}


export function searchRoles(params) {
  return new Promise((resolve, reject) => {
    api
      .get(`role/search?name=${params?.name}`)
      .then((res) => {
        resolve(res?.data); // Resolve the promise with the data
      })
      .catch((err) => {
        reject(err); 
      });
  });
}

