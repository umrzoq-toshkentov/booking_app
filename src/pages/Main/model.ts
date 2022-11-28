import { ExamsProps } from 'shared/api'
import * as yup from 'yup'
import { REQUIRED_TEXT } from 'utils'
export interface DeleteRef {
  onOpen: (row: ExamsProps) => void
  onClose: () => void
}

export interface DeleteProps {
  name: string
}

export interface AddRef {
  onOpen: () => void
  onClose: () => void
}

export interface AddProps {
  name: string
}

export interface DataParams {
  data: ExamsProps[]
  count: number
}

export const resolver = yup.object().shape({
  price: yup.string().required(REQUIRED_TEXT),
  startedDate: yup.string().required(REQUIRED_TEXT),
  title: yup.string().required(REQUIRED_TEXT),
  subjectId: yup.string().required(REQUIRED_TEXT),
})
