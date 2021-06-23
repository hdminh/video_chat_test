import axios from 'axios';

const token = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN_NAME);

// Create new group (thêm group)
export const createGroup = async (data) => {
    const url = process.env.REACT_APP_API_BASE_URL + '/group';
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'auth-token': token
        }
    }
    const res = await axios.post(url, data, config);
    return res;
}

// Update group (cập nhật group)
export const updateGroup = async (data) => {
    console.log(data);
    const url = process.env.REACT_APP_API_BASE_URL + '/group';
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'auth-token': token
        }
    }
    const res = await axios.patch(url, data, config);
    return res;
}

// Send request to join group (Gửi yêu cầu tham gia group)
export const sendReqJoinGroup = async (data) => {
    const url = process.env.REACT_APP_API_BASE_URL + '/group/requestjoin';
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'auth-token': token
        }
    }
    const res = await axios.post(url, data, config);
    return res;
}

// Confirm request join group (Gửi xác nhận tham gia/không tham gia group)
export const confirmReqJoinGroup = async (data) => {
    const url = process.env.REACT_APP_API_BASE_URL + '/group/requestjoin';
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'auth-token': token
        }
    }
    const res = await axios.post(url, data, config);
    return res;
}

// remove participant in group (xoá thành viên ra khỏi group)\

// leave group (rời group)

// get list group of current user (lấy danh sách group của user (host and member))
export const getGroupOfUser = async () => {
    const url = process.env.REACT_APP_API_BASE_URL + '/group/getgroupofuser';
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'auth-token': token
        }
    }
    const res = await axios.get(url, config);
    return res;
}

// get group by groupid (chi tiết group theo id group)
export const getGroupById = async (groupId) => {
    const url = process.env.REACT_APP_API_BASE_URL + '/group/getgroupofuser/' + groupId;
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'auth-token': token
        }
    }
    const res = await axios.get(url, config);
    return res;
}

// get list group (lấy danh sách group theo filter)
export const getListGroup = async (params) => {
    const url = process.env.REACT_APP_API_BASE_URL + '/group';
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'auth-token': token
        },
        params
    }
    const res = await axios.get(url, config);
    return res;
}