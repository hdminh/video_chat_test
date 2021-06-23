import axios from 'axios';

export const getUserInfo = async () => {
    const url = process.env.REACT_APP_API_BASE_URL + '/user';
    const token = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN_NAME)
    let params = {
        "select[]": [
            "favorites", "occupations", "listliked", "friends", "historymatch"
        ]
    }
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'auth-token': token
        },
        params: params
    }
    const res = await axios.get(url, config);
    return res;
};

export const getUserById = async (id) => {
    const url = process.env.REACT_APP_API_BASE_URL + '/user/' + id;
    const token = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN_NAME);
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'auth-token': token
        }
    };
    const res = await axios.get(url, config);
    return res;
}