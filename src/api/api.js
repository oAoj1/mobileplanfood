import axios from 'axios'

const url = 'https://beplanfood.onrender.com'

const api = axios.create({
    baseURL: url
})

export default api