import * as yup from 'yup'
import { REQUIRED_TEXT } from '../../utils'

export const resolver = yup.object().shape({
  number: yup.string().required(REQUIRED_TEXT),
  password: yup.string().required(REQUIRED_TEXT),
})
