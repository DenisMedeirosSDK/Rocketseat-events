import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://192.168.25.14:3333/'
})

