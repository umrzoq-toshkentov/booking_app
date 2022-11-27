import { queryClient } from 'app/providers/reactQuery'
import apiReq from '.'
import { QUERY_KEY } from './constants'

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
  queryClient.setQueryData([QUERY_KEY.EXAMS], res.data.data)
  return {
    data: res.data.data as ExamsProps[],
    count: res.data.pageable.count as number,
  }
}

export const deleteExam = async (id: number) => {
  const res = apiReq.delete(`exam/delete/${id}`)
  return res
}
