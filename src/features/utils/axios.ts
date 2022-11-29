import axios from 'axios';

export interface IDataResponse {
  data: any;
  isSuccess: boolean;
}

const { REACT_APP_API, REACT_APP_API_PRIVATE } = process.env;

const publicHTTP = axios.create({ baseURL: String(REACT_APP_API) });
const privateHTTP = axios.create({
  baseURL: String(REACT_APP_API_PRIVATE),
});

export { publicHTTP, privateHTTP };
