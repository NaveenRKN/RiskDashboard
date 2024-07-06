import axios from "axios";
import { API_RISK } from "../../config/navigation/constants"

const postLogin = async (formData) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`${API_RISK}api/User/AuthenticateUser`, formData)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error.response.data ? error.response.data : error);
            });
    });
};

const logOut = async (data) => {
    let heads = {
        headers: {
            Authorization: `Bearer ${data.token}`,
            Custid: data.custid,
            Userid: data.userId,
        },
    };
    return new Promise((resolve, reject) => {
        axios
            .get(`${API_RISK}api/Account/LogoutUser`, heads)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export { postLogin, logOut };