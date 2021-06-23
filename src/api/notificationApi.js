import axios from 'axios';

// Lấy tất cả thông báo
export const getAllNotification = async (page, rowsperpage) => {
    const url = process.env.REACT_APP_API_BASE_URL + '/notification';
    const token = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN_NAME)
    let params = {
        page,
        rowsperpage
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