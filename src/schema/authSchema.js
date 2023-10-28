import * as yup from 'yup'




export const loginSchema = yup 
  .object({
    employeeNo: yup.string().required().label('Badge No').typeError('Badge Number is required'),
    password: yup.string().required('Password is required').label('Password').typeError('Password must be required')
  })
  .required()

  export const reportSchema = yup
  .object({
    reportNumber: yup.string().required('Report Number is required').label('Report Number').typeError('Report Number must be required')
  })
  .required()
