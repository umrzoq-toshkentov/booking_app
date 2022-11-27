import { ExamsProps } from 'shared/api'

export interface DeleteRef {
  onOpen: (row: ExamsProps) => void
  onClose: () => void
}

export interface DeleteProps {
  name: string
}

export interface DataParams {
  data: ExamsProps[]
  count: number
}
