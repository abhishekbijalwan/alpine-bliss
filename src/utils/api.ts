import axios from 'axios'

const baseURL = `${import.meta.env.VITE_APP_DOMAIN}`

const instance = axios.create({
  baseURL,
  headers: {
    'Content-type': 'application/json'
  }
})

export const api = {
  get: (url, params, config) => instance.get(url, { params, ...config }),

  post: (url, data) => instance.post(url, data)
}
