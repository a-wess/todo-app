import axios from 'axios'

export const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 1000,
})

instance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if(error.response.status == 403){
            window.location.href = '/auth'
        } else {
            throw error
        }
    }
);

instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('jwt-token');
    if (token?.length > 0) config.headers.Authorization = `Bearer ${token}`;

    return config;
});