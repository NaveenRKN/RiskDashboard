import axios from './axios-configure';
import { API_RISK } from "../../config/navigation/constants"

const getTodo = async (data) => {
    return new Promise((resolve, reject) => {
        axios
            .get(`${API_RISK}api/User/GetUserToDoList/${data}`)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};


const addOrUpdateTodo = async (formData) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`${API_RISK}api/User/AddOrUpdateToDoList`, formData)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    })
}
const deleteTodoList = async (data) => {
    return new Promise((resolve, reject) => {
        axios
            .delete(`${API_RISK}api/User/DeleteToDoList/${data}`)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    })
}

export { getTodo, addOrUpdateTodo ,deleteTodoList};