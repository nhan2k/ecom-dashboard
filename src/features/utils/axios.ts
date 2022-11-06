import axios from 'axios';
import { getItem } from './local.storage';

export interface IDataResponse {
  data: any;
  isSuccess: boolean;
}

const { REACT_APP_API, REACT_APP_API_PUBLIC } = process.env;
const user = getItem('user');
const publicHTTP = axios.create({ baseURL: String(REACT_APP_API) });
const privateHTTP = axios.create({
  baseURL: String(REACT_APP_API_PUBLIC),
  headers: {
    Authorization: `Bearer ${user.accessToken}`,
  },
});

export { publicHTTP, privateHTTP };
