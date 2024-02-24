import * as yup from 'yup';

export const Requestschema = yup.object({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  phoneNumber: yup.string().required('Phone Number is required'),
  CNIC: yup.string().matches(/^\d{13}$/, 'CNIC must be 13 digits').required('CNIC is required'),
  gender: yup.string().oneOf(['Male', 'Female', 'Other'], 'Invalid gender').required('Gender is required'),
  test: yup.string().required('Test is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  age: yup.string().required('Age is required'),
  test: yup.string().required('Test is required'),
  pdfName: yup.string().required('Report ID is required'),
  
}).required()

