import api from "@/utils/axios";




export function getInstruments() {
  return new Promise((resolve, reject) => {
    api
      .get(`Instrument`)
      .then((res) => {
        resolve(res?.data); // Resolve the promise with the data
      })
      .catch((err) => {
        reject(err); 
      });
  });
}


export function createInstrument(params) {
  return new Promise((resolve, reject) => {
    api
      .post("Instrument", params)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function updateInstrument(params) {
  return new Promise((resolve, reject) => {
    api
      .patch(`Instrument/${params?.id}`, params)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function deleteInstrument(params) {
  return new Promise((resolve, reject) => {
    api
      .delete(`Instrument/${params}`, params)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}


export function searchInstrument(params) {
  return new Promise((resolve, reject) => {
    api
      .get(`Instrument/search?name=${params?.name}`)
      .then((res) => {
        resolve(res?.data); // Resolve the promise with the data
      })
      .catch((err) => {
        reject(err); 
      });
  });
}

