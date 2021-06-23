import APIPath from './api-const/api-const';
import AxiosIntance from './axios-config/axiosCofig';

/**
 * 
 * @param {Object} data match now body
 * @param {number} data.lat
 * @param {number} data.long 
 * @param {number} data.gender 
 * @param {number} data.relationship 
 * @param {number} data.distance 
 * @param {number} data.maxage
 * @param {number} data.minage 
 * @returns {jons}  match now response
 */
export const matchNow = async (data) => {
    const axiosIntance = AxiosIntance();
    const res = await axiosIntance.post(APIPath.REQUEST_MATCH_NOW, data);
    return res;
}

/**
 * Cancel request match now and match late
 * @returns cancel request match response
 */
export const cancelRequestMatch = async () => {
    const axiosIntance = AxiosIntance();
    const res = await axiosIntance.post(APIPath.CANCEL_MATCH_REQUEST_MATCH_NOW);
    return res;
}

/**
 * Confirm match (now and later)
 * @param {Object} data 
 * @param {boolean} data.status
 * @param {string} data.id
 * @returns Response confirm match
 */
export const confirmRequestMatch = async (data) => {
    const axiosIntance = AxiosIntance();
    const res = await axiosIntance.patch(APIPath.CONFIRM_MATCH, data);
    return res;
}

export const getAllMatch = async () => {
    const axiosIntance = AxiosIntance();
    const res = await axiosIntance.get(APIPath.GET_ALL_MATCH);
    return res;
}


export const getChat = async (params) => {
    const axiosIntance = AxiosIntance();
    const res = await axiosIntance.get(APIPath.GET_CHAT, { params: params });
    return res;
}


