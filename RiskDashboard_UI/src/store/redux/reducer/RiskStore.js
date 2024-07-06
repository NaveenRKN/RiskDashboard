import * as UserConstants from '../contsants';

const instialState = {
  riskData: null,
  loading: false,
  error: false,
  emailSend:{}
};

const RiskStore = (state = instialState, action) => {
  switch (action.type) {
    case UserConstants.GET_RISK:
      return { ...state, loading: true,riskData:null };
    case UserConstants.GET_RISK_SUCCESS:
      return { ...state, riskData: action.payload, loading: false };
    case UserConstants.GET_RISK_ERROR:
      return { ...state, loading: false, error: true };
    case UserConstants.EMAIL_RISK_SEND:
      return { ...state, loading: false, emailSend: action.payload,error: true };
    case UserConstants.EMAIL_RISK_SEND_CLEAR:
      return { ...state, loading: false, emailSend: {},error: true };
    default:
      return state;
  }
};
export default RiskStore