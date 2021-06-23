import axios from 'axios';

const token = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN_NAME)

// login google
export const loginGoogle = async (data) => {
    const url = process.env.REACT_APP_API_BASE_URL + '/auth/logingoogle';
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'auth-token': token
        }
    }
    const res = await axios.post(url, data, config);
    return res;
}

// login facebook
export const loginFacebook = async (data) => {
    const url = process.env.REACT_APP_API_BASE_URL + '/auth/loginfacebook';
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'auth-token': token
        }
    }
    const res = await axios.post(url, data, config);
    return res;
}