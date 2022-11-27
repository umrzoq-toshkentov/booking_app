import apiReq from '.'

export interface LoginParams {
  number: string
  password: string
}

export const login = async (body: LoginParams) => {
  const res = await apiReq.post('auth/login', body)
  return res
}

export interface ExamsProps {
  id: number
  title: string
  startedDate: Date
  subjectId: number
  price: number
  active: boolean | null
  createdAt: Date
  createdBy: number
  updatedAt: Date
}

export const getExams = async () => {
  const res = await apiReq.get('exam/list')
  return res.data.data as ExamsProps[]
}
