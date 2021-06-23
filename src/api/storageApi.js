import axios from 'axios';

const token = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN_NAME);

// get signed url for upload image
export const getSignUrl = async (params) => {
    const url = process.env.REACT_APP_API_BASE_URL + '/storage';
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

// upload file
export const uploadFile = async (uploadUrl, file) => {
    console.log("upload url is: ", uploadUrl);
    const url = uploadUrl.replace( /^[a-zA-Z]{3,5}\:\/{2}[a-zA-Z0-9_.:-]+\//, '' );
    console.log("url is: ", url);
    console.log("file is: ", file.file);
    const config = {
        headers: {
            'Content-Type': 'image/jpeg',
            'auth-token': token
        }
    }
    const res = await axios.put('/' + url, file.file ,config);
    return res;
}