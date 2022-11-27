import apiReq from '.'

export interface LoginParams {
  number: string
  password: string
}

export const login = async (body: LoginParams) => {
  const res = await apiReq.post('auth/login', body)
  return res
}
