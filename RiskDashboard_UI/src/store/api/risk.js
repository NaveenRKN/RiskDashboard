import axios from './axios-configure';
import axiosUpload from "axios";
import { API_RISK } from "../../config/navigation/constants"

const getRisk = async ({ startYear, endYear, riskType }) => {
    return new Promise((resolve, reject) => {
        let riskTypes = riskType ?'/'+riskType : ''
        let year = startYear ? `${startYear.year}/${startYear.month}/${startYear.date}/${endYear.year}/${endYear.month}/${endYear.date}` :"";
        let endPoint =year+  riskTypes 
        axios
            .get(`${API_RISK}api/RiskDashboard/GetRisks/` + endPoint)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};


const uploadRiskData = async (formData) => { 
    let heads = {
        headers: {
            "content-type": `multipart/form-data`, 
            "Authorization":`Bearer ${localStorage.getItem("aceessToken")}`
        },
    };
    return new Promise((resolve, reject) => {
        axiosUpload
            .post(`${API_RISK}api/RiskDashboard/SaveRisks`, formData,heads)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    })
}
const sendMailRiskData = async (formData) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`${API_RISK}api/User/SendEmailNotification`, formData)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    })
}
const getInfoFile = async (data) => {
    return new Promise((resolve, reject) => {
        axios
            .get(`${API_RISK}api/RiskDashboard/GetLastImportedFileDetails`)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    })
}

export { getRisk, uploadRiskData ,sendMailRiskData,getInfoFile};