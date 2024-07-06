import axios from "axios";
import { API_URL } from "../../config/navigation/constants";
import { SetupInterceptors } from './SetupInterceptors'

const app = axios.create({
  baseURL: API_URL,
});
SetupInterceptors(app)

export default app;
