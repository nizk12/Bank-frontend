import axios, { CanceledError } from "axios";

const apiClient = axios.create({ baseURL: 'https://abcbank-xxh8.onrender.com/api' })
export { apiClient, CanceledError } 
