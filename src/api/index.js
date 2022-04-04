import axios from "axios";

const API = axios.create({ baseURL: 'http://localhost:4000' })

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = 
            `Bearer ${JSON.parse(localStorage.getItem('profile'))?.token}`
    }
})

export const adminLogin = (formData) => API.post('/adminLogin', formData) 
export const adminRegister = (formData) => API.post('/adminRegister', formData)
export const userLogin = (formData) => API.post('/userLogin', formData)
export const userRegister = (formData) => API.post('/userRegister', formData)