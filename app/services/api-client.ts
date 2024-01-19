import axios, { CanceledError } from "axios";

const apiClient = axios.create({ baseURL: 'https://bank-server-h7hs.onrender.com/api' })
export { apiClient, CanceledError } 
