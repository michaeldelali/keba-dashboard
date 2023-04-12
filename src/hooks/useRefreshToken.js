import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            console.log("Response::",response.data);
            return {
                ...prev,
                roles: response.data.roles,
                accessToken: response.data.accessToken,
                firstname: response.data.firstname,
                lastname: response.data.lastname,
                branchId: response.data.branchId,
                restaurantId: response.data.restaurantId
            }
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;


// import axios from '../api/axios';
// import useAuth from './useAuth';

// const useRefreshToken = () => {
//     const { setAuth } = useAuth();

//     const refresh = async () => {
//         const response = await axios.get('/refresh', {
//             withCredentials: true
//         });
//         setAuth(prev => {
//             console.log(JSON.stringify(prev));
//             console.log(response.data.accessToken);
//             return {accessToken: response.data.accessToken}
//             // return { ...prev, accessToken: response.data.accessToken }
//         });
//         return response.data.accessToken;
//     }
//     return refresh;
// };

// export default useRefreshToken;
