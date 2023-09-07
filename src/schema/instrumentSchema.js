import * as yup from 'yup'


export const instrumentSchema = yup.object({
   name: yup
      .string()
      .trim()
      .typeError('Name is a required field')
      .required()
      .test('no-leading-space', 'Name should not start with a space.', value => value[0] !== ' ')
      .test('no-extra-space', 'Name should not have extra spaces.', value => !/\s{2}/.test(value))
      .matches(/^[^/\\]+$/, 'Slash is not allowed')
      .label('Name'),
   quanity: yup
      .number()
      .required()
      .label('Number')
      .typeError('Invalid Number')
})
.required