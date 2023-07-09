import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

const defaultHeaders = {
    "Content-Type": "application/json"
};

const requests = {
    get: (url, headers = {}) => axios.get(url, { headers: { ...defaultHeaders, ...headers } }),
    post: (url, body, headers = {}) => axios.post(url, body, { headers: { ...defaultHeaders, ...headers } }),
    put: (url, body, headers = {}) => axios.put(url, body, { headers: { ...defaultHeaders, ...headers } }),
    delete: (url, headers = {}) => axios.delete(url, { headers: { ...defaultHeaders, ...headers } }),
}

const Users = {
    register: (userData) => requests.post('users/register', userData),
    logIn: (authData) => requests.post("users/login", authData),
}

const Projects = {
    getProjects: (token) => requests.get("projects", { 'x-auth-token': token }),
}

const ApiAgent = {
    Users,
    Projects
}

export default ApiAgent;