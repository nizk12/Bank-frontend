import axios, { CanceledError } from "axios";

const apiClient = axios.create({ baseURL: 'https://abcbank-31lv.onrender.com/api' })
export { apiClient, CanceledError } 
