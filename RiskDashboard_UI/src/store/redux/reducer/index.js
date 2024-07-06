import { combineReducers } from 'redux';
import LoginStore from './LoginStore';
import RiskStore from './RiskStore';
import TodoStore from './TodoStore'; 
import UploadFileStore from './UploadFileStore';

const index = combineReducers({
    LoginStore,
    RiskStore,
    TodoStore, 
    UploadFileStore
})
export default index;