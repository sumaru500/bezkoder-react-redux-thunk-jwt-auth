import { AxiosResponse } from "axios";
import authService from "../services/auth.service";

export function errorInterceptor(response: AxiosResponse) {
    let data = response.data;
    console.log("Response data: ", [response]);
    data = data && JSON.parse(data);
    if ([401, 403].indexOf(response.status) !== -1) {
        // logout automatically
        authService.logout();
        console.log("error when request");
        const error = (data && data.message) || response.statusText
        return Promise.reject(error);
    }

    return response;
}