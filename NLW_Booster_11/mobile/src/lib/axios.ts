import axios from "axios";

export const api = axios.create({
  // baseURL: 'http://192.168.18.2:3333',
  baseURL: 'https://39f2-187-94-15-252.sa.ngrok.io',
})