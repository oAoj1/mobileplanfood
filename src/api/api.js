import axios from 'axios'

const api = axios.create({
    baseURL:'https://beplanfood.onrender.com'
})

export default api