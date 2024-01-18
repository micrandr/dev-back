import axios from 'axios';

//export const API_URI_AXIOS = 'https://127.0.0.1:8000/api/'
export const API_URI_AXIOS = 'https://dev-api.formationbtp.fr/index.php/api/'

export default axios.create({
    //baseURL: 'https://127.0.0.1:8000/api/'
    baseURL: 'https://dev-api.formationbtp.fr/index.php/api/'
});