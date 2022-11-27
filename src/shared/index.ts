import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import Cookies from 'js-cookie'

export enum TOKEN {
  AUTH_TOKEN = 'token',
}
const constants = {
  URL: 'http://143.198.183.45:8080/api/',
}

const apiReq = axios.create({
  baseURL: constants.URL,
  headers: {},
})

apiReq.interceptors.request.use((config: AxiosRequestConfig | any) => {
  const companyToken = Cookies.get(TOKEN.AUTH_TOKEN)
  config.headers['authorization'] = `Bearer ${companyToken}`
  return config
})

interface ResponseParams {
  response: {
    status: number
  }
}

apiReq.interceptors.response.use(
  (response) => {
    return response
  },
  async (err: ResponseParams) => {
    const navigateToLogin = () => {
      Cookies.remove(TOKEN.AUTH_TOKEN)
      window.location.pathname = '/login'
    }

    if (err?.response?.status === 401) {
      navigateToLogin()
    }
    return Promise.reject(err)
  }
)

export default apiReq
