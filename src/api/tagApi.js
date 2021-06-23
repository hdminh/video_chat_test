import axios from 'axios';

const token = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN_NAME);

// Get all group tag
export const getAllTag = async (params) => {
    const url = process.env.REACT_APP_API_BASE_URL + '/tag';
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'auth-token': token
        }
    }
    const res = await axios.get(url, config);
    return res;
}