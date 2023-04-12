import { axiosPrivateForms } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivateForms = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();
    
    useEffect(() => {
        
        const requestIntercept = axiosPrivateForms.interceptors.request.use(
            config => {
                console.log("AUTH: " + JSON.stringify(auth));
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }
                // console.log("Request Interceptor: " + JSON.stringify(config));
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivateForms.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivateForms(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivateForms.interceptors.request.eject(requestIntercept);
            axiosPrivateForms.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh])

    return axiosPrivateForms;
}

export default useAxiosPrivateForms;