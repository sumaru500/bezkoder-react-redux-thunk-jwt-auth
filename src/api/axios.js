import axios from 'axios';
import { authInterceptor } from './auth.interceptor.ts';
import {errorInterceptor} from './error.interceptor.ts';

const instance = axios.create(
    // {
    //     withCredentials: true,
    // }
)

// configure request intercepter
instance.interceptors.request.use(authInterceptor)

// configure response intercepter
// instance.interceptors.response.use(errorInterceptor)

export default instance;