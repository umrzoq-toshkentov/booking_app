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

export interface AddExam {
  price: number
  startedDate: Date
  title: string
  active: boolean
}

export interface SubjectParam extends AddExam {
  subjectId: string
}

export interface SubjectCreateMutation extends AddExam {
  subjectId: number
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

export interface SubjectParams {
  id: number
  name: string
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
  const res = await apiReq.delete(`exam/delete/${id}`)
  return res
}

export const createExam = async (body: SubjectCreateMutation) => {
  const res = await apiReq.post('exam/createOrUpdate', body)
  return res
}

export const getSubjects = async () => {
  const res = await apiReq.get('subject/list')

  return res.data
}
