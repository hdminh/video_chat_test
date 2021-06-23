import React from 'react';
import { useHistory } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { loginFacebook } from '../../../api/authApi';

export default function LoginFB(props) {
  let history = useHistory();

  const responseFacebook = (response) => {
    console.log("login gg success", response);
    let data = {
      accesstoken: response.accessToken
    };

    loginFacebook(data)
      .then((res) => {
        console.log("res token", res)
        if (res.status === 200) {
          localStorage.setItem("token", res.data.data.token);
          localStorage.setItem("typeSignin", "facebook"); // type sign in
          history.push("/");
        }
      })
      .catch((err) => {
        console.log("err token", err)
      });
  }

  return (

    <FacebookLogin
      appId="912661759266363"
      autoLoad={true}
      fields="name,email,picture"
      callback={responseFacebook}
      render={renderProps => (
        <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="login50-facebook">
          Login facebook
        </button>
      )}
    />
  )
}