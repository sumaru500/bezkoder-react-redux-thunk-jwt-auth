import {AxiosRequestConfig} from 'axios';
import authHeader from '../services/auth-header';
export function authInterceptor(config: AxiosRequestConfig) {
    config.headers = {...config.headers, ...authHeader()}
    return config;
}