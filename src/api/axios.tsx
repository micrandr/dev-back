import axios from 'axios';

//export const API_URI_AXIOS = 'https://127.0.0.1:8000/api/'
export const API_URI_AXIOS = 'https://dev-api.formationbtp.fr/index.php/api/'

//export const API_URI_ROOT = 'https://127.0.0.1:8000/api/'
export const API_URI_ROOT = 'http://devapi-of.yigo3928.odns.fr/'

//export const API_URI_UPLOAD = 'https://127.0.0.1:8000/uploads/'
export const API_URI_UPLOAD = 'http://devapi-of.yigo3928.odns.fr/uploads'

//export const API_URI_IMAGES = 'https://127.0.0.1:8000/images/'
export const API_URI_IMAGES = 'http://devapi-of.yigo3928.odns.fr/images/'



export default axios.create({
    //baseURL: 'https://127.0.0.1:8000/api/'
    baseURL: 'https://dev-api.formationbtp.fr/index.php/api/'
});