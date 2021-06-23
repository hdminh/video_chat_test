import axios from 'axios';

export const getPlaces = async (data, page, size) => {
    const url = process.env.REACT_APP_API_BASE_URL + '/place';
    const token = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN_NAME)
    let params = {
        page: page,
        rowsperpage: size
    }
    if (data.type) params.type = data.type;
    if (data.sortby) {
        params.sort = -1
        params.sortby = data.sortby
    }
    if (data.textsearch) params.textsearch = String(data.textsearch);
    
    const config = {
        headers:{
            'Content-Type': 'application/json',
            'auth-token': token
        }, 
        params: params
    }
    const res = await axios.get(url, config);
  return res;
};

export const getComment = async (id) => {
    const url = process.env.REACT_APP_API_BASE_URL + '/place/getcommentsplacebyid/' + id;
    const token = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN_NAME)
    const config = {
        headers:{
            'Content-Type': 'application/json',
            'auth-token': token
        }
    }
    const res = await axios.get(url, config);
  return res;
};

export const addComment = async (dataIn) => {
    const url = process.env.REACT_APP_API_BASE_URL + '/place/comment';
    const token = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN_NAME)
    const config = {
        headers:{
            'Content-Type': 'application/json',
            'auth-token': token
        }
    }
    const data = {
        id: dataIn.id,
        rating: dataIn.rating
    }
    if (dataIn.comment) data.comment = dataIn.comment
    const res = await axios.patch(url, data, config);
  return res;
} 


