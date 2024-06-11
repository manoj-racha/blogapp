import axios from "axios"

const token = localStorage.getItem('token')
export const axiousWithToken = axios.create({
    headers:{Authorization:`Brearer ${token}`}
})