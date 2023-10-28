import * as yup from 'yup'

// ** Schema for Adding New Role

export const roleSchema = yup
  .object({
    name: yup
      .string()
      .min(1, 'Name is a required field.')
      .trim()
      .required('Name is a required field.')
      .typeError('Name is a required field.')
      .test('no-leading-space', 'Name should not start with a space.', value => value[0] !== ' ')
      .test('no-extra-space', 'Name should not have extra spaces.', value => !/\s{2}/.test(value))
      .matches(/^[^/\\]+$/, 'Slash is not allowed')
      .label('Name'),
  }) 
  .required()
