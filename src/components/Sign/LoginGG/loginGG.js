import React from 'react';
import { useHistory } from 'react-router-dom';
import { loginGoogle } from '../../../api/authApi';
import { GoogleLogin } from 'react-google-login';

export default function LoginGG(props) {
  let history = useHistory();

  const loginSuccess = (response) => {
    console.log("login gg success", response);
    let data = {
      googleToken: response.tokenId
    };
    loginGoogle(data)
      .then((res) => {
        console.log("res token", res)
        if (res.status === 200) {
          localStorage.setItem("token", res.data.data.token);
          localStorage.setItem("typeSignin", "google"); // type sign in
          history.push("/");
        }
      })
      .catch((err) => {
        console.log("err token", err)
      });
  }

  const loginFail = (response) => {
    console.log("login gg fail", response);
  }

  return (
    <GoogleLogin
      clientId="484147844027-tg192tgmd8mvam4998q5fruppgqdqu30.apps.googleusercontent.com"
      render={renderProps => (
        <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="login50-google">Login google</button>
      )}
      buttonText="Login"
      onSuccess={loginSuccess}
      onFailure={loginFail}
      cookiePolicy={'single_host_origin'}
    />
  )
}