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
    initial: yup.string().required().label('Initial').typeError('Initial is a required field'),
    email: yup.string().required().email('Invalid email').label('Email').typeError('Email is a required field'),
    employeeNo: yup.number().required().typeError('Employee No is a required field').label('Employee No'),
    stamp: yup.string().required().label('Stamp').typeError('Stamp is required'),
    sign: yup.string().required().label('Sign').typeError('Sign is required'),
    category: yup.string().required('Category is required ').label('Category').typeError('Category is required '),
    employeeType: yup.string().required().label('Employee Type').typeError('Employee Type is required '),
    roles: yup.array().label('Assign Roles').typeError('Assign Roles are required'),
    sections: yup
      .array()
      .min(1, 'Assign at least 1 units to the user')
      .required()
      .label('Assign Units')
      .typeError('Assign Units are required'),
    userTitleIds: yup
      .array()
      .min(1, 'Assign at least 1 title to the user')
      .required()
      .label('Assign Titles')
      .typeError('Assign Titles are required'),
    userLocation: yup.string().required().label('Location').typeError('Location is required'),
    password: yup
      .string()
      .nullable()
      .matches(
        /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!@#$%^&*])[A-Za-z0-9!@#$%^&*]+$/,
        'Password must contain at least 1 uppercase letter, 1 special character, and 1 number'
      )
      .label('Password')
      .typeError('Password is required'),
    confirmPassword: yup
      .string()
      .nullable()
      .label('Confirm Password')
      .typeError('Confirm Password is required')
      .oneOf([yup.ref('password'), null], 'Passwords must match')
  })
  .required()

export const updateNonActiveUserSchema = yup
  .object({
    firstName: yup.string().required().label('First Name').typeError('First Name is a required field'),
    lastName: yup.string().required().label('Last Name').typeError('Last Name is a required field'),
    email: yup.string().required().email('Invalid email').label('Email').typeError('Email is a required field'),
    employeeNo: yup.number().required().typeError('Employee No is a required field').label('Employee No')
  })
  .required()
