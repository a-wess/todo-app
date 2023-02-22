import { instance } from "./index.api"

const login = (payload) => instance.post('/user/login', payload);
const register = (payload) => instance.post('/user/register', payload);

export default {
    login,
    register
}
