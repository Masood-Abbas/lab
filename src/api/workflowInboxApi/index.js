import api from "@/utils/axios";

export function getReport(params) {
  return new Promise((resolve, reject) => {
    api
      .post(`download`, params, { responseType: 'blob' }) // Specify responseType as 'blob' to receive binary data
      .then((res) => {
        // Create a URL representing the PDF content
        const url = URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
        
        // Open a new window or tab with the PDF file
        window.open(url);
        
        resolve(); // Resolve the promise after opening the PDF
      })
      .catch((err) => {
        reject(err);
      });
  });
}

