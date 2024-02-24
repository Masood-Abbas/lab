import * as yup from 'yup'

export const addUserSchema = yup
  .object({
    firstName: yup.string().required().label('First Name').typeError('First Name is a required field'),
    lastName: yup.string().required().label('Last Name').typeError('Last Name is a required field'),
    // profile_img: yup.string().required().label('Initial').typeError('Initial is a required'),
    email: yup.string().required().email('Invalid email').label('Email').typeError('Email is a required field'),
    employeeNo: yup.number().required().typeError('Employee No is a required field').label('Employee No'),    
    category: yup.string().required('Category is required ').label('Category').typeError('Category is required '),
    employeeType: yup.string().required().label('Employee Type').typeError('Employee Type is required '),
    password: yup.string().required().label('Password').typeError('Password is a required'),
   
  })
  .required()

  export const updateUserSchema = yup
  .object({
    firstName: yup.string().required().label('First Name').typeError('First Name is a required field'),
    lastName: yup.string().required().label('Last Name').typeError('Last Name is a required field'),
    // profile_img: yup.string().required().label('Initial').typeError('Initial is a required'),
    email: yup.string().required().email('Invalid email').label('Email').typeError('Email is a required field'),
    employeeNo: yup.number().required().typeError('Employee No is a required field').label('Employee No'),    
    category: yup.string().required('Category is required ').label('Category').typeError('Category is required '),
    employeeType: yup.string().required().label('Employee Type').typeError('Employee Type is required '),
   
  })
  .required()
