import axios from 'axios';
import { createRequestInstance, watchRequests } from 'redux-saga-requests';
import axiosDriver from 'redux-saga-requests-axios';
import Alert from "react-s-alert";

axios.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response.status === 401) {
      window.location = '/login';
    }
    if (error.response.status === 500) {
      Alert.error(error.response.data.message, {
        position: 'bottom',
        effect: 'jelly',
        offset: '0',
        timeout: 5000
      });
    }
    return Promise.reject(error);
  });

export default function* rootSaga() {
  yield createRequestInstance(axios, { driver: axiosDriver });
  yield watchRequests();
}
