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

interface PageParams {
  page: number
  size: number
}

export const getExams = async ({ page, size }: PageParams) => {
  const res = await apiReq.get(`exam/list?page=${page}&size=${size}`)
  return res.data.data as ExamsProps[]
}
