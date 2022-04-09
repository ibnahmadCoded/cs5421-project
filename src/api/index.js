import axios from "axios";

const API = axios.create({ baseURL: 'http://localhost:4000' })

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = 
            `Bearer ${JSON.parse(localStorage.getItem('profile'))?.token}`
    }
    return req
})

export const adminLogin = (formData) => API.post('/api/admins/adminLogin', formData) 
export const adminRegister = (formData) => API.post('/api/admins/adminReg', formData)
export const userLogin = (formData) => API.post('/api/users/userLogin', formData)
export const userRegister = (formData) => API.post('/api/users/userReg', formData)