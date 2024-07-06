import * as UserConstants from '../contsants';

const instialState = {
    fileData: null,
    fileInfo: null,
    loading: false,
    error: false,
};

const UploadFileStore = (state = instialState, action) => {
    switch (action.type) {
        case UserConstants.UPLOAD_RISK_FILE:
            return { ...state, loading: true };
        case UserConstants.UPLOAD_RISK_FILE_SUCCESS:
            return { ...state, fileData: action.payload, loading: false };
        case UserConstants.GET_RISK_FILEINFO:
            return { ...state, fileInfo: action.payload, loading: false };
        case UserConstants.UPLOAD_RISK_FILE_CLEAR:
            return { ...state, fileData: null, loading: false };
        case UserConstants.UPLOAD_RISK_FILE_ERROR:
            return { ...state, loading: false, error: true };
        default:
            return state;
    }
};
export default UploadFileStore