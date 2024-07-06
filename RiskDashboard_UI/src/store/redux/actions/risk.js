import * as UserConstants from "../contsants";
import { getRisk, uploadRiskData ,sendMailRiskData,getInfoFile} from "../../api/risk";

export const getRiskAction = (user) => (dispatch) => {
  return new Promise((resolve, reject) => {
    getRisk(user)
      .then((response) => {
        dispatch({
          type: UserConstants.GET_RISK_SUCCESS,
          payload: response.data,
        });
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const uploadRiskFile = (file) => (dispatch) => { 
  return new Promise((resolve,reject) => {
    dispatch({
      type: UserConstants.UPLOAD_RISK_FILE,
    });
    uploadRiskData(file)
      .then((response) => {
        dispatch({
          type: UserConstants.UPLOAD_RISK_FILE_SUCCESS,
          payload: response.data,
        });
        resolve(response);
      })
      .catch((err) => {
        dispatch({
          payload: err,
          type: UserConstants.UPLOAD_RISK_FILE_ERROR,
        });
        reject(err);
      }); 
  });
};
export const sendMailData = (file) => (dispatch) => {
  return new Promise((resolve) => {
    sendMailRiskData(file).then((response) => {
      dispatch({
        type: UserConstants.EMAIL_RISK_SEND,
        payload: response.data,
      });
      resolve(response);
    });
  });
};
export const getInfoFileData = (data) => (dispatch) => {
  return new Promise((resolve) => {
    getInfoFile(data).then((response) => {
      dispatch({
        type: UserConstants.GET_RISK_FILEINFO,
        payload: response.data,
      });
      resolve(response);
    });
  });
};
export const sendMailDataClear = () => (dispatch) => {
    dispatch({
      type: UserConstants.EMAIL_RISK_SEND_CLEAR,
      payload: {},
    }) 
};
export const uploadRiskFileClear = () => (dispatch) => { 
    return new Promise((resolve) => { 
        dispatch({
          type: UserConstants.UPLOAD_RISK_FILE_CLEAR,
        });
        resolve(); 
    });  
};
