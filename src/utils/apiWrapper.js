import axios from 'axios';
const hostUrl = window.location.origin;
let apiUrl='https://admin.horecastore.sa/api';
if(hostUrl=='https://uaehorecastore.netlify.app'){
    apiUrl='https://horeca-uae.testhssite.com/api';
} 

// Create an Axios instance
const apiClient = axios.create({
    baseURL: apiUrl,
});

// Interceptor to add Authorization header if authToken exists
apiClient.interceptors.request.use(config => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
        config.headers['Authorization'] = `Bearer ${authToken}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Wrapper functions for HTTP methods
export const api = {
    get: (url, params = {}, config = {}) => apiClient.get(url, { params, ...config }),
    post: (url, data, config = {}) => apiClient.post(url, data, config),
    put: (url, data, config = {}) => apiClient.put(url, data, config),
    patch: (url, data, config = {}) => apiClient.patch(url, data, config),
    delete: (url, config = {}) => apiClient.delete(url, config),
};

export { apiClient };
