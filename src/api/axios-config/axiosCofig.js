import axios from 'axios';

const AxiosIntance = () => {
    const TOKEN = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN_NAME);
    const instance = axios.create();

    let header;
    if (TOKEN) {
        header = {
            "auth-token": TOKEN,
            'Content-Type': 'application/json',
        }
    }
    else {
        header = {
            'Content-Type': 'application/json',
        }
    }

    //instance.defaults.baseURL = "https://togetherapis.herokuapp.com/api/v1";
    instance.defaults.baseURL = "https://togetherapis.herokuapp.com/api/v1";
    instance.defaults.headers.common = header;

    instance.interceptors.request.use(request => {
        console.log("Request " + JSON.stringify(request));
        // Edit request config
        return request;
    }, error => {
        console.log(error);
        return Promise.reject(error);
    });

    instance.interceptors.response.use(response => {
        console.log("Response " + JSON.stringify(response));
        // Edit response config
        return response;
    }, error => {
        console.log(error);
        return Promise.reject(error);
    });
    return instance;
}

export default AxiosIntance;

