import React from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import KakaoLogin from "react-kakao-login";
import config from "config";
import Input from "components/input/Input";
import Button from "components/Button/Button";

const Login = () => {
  const responseSuccess = response => {
    // email, username, profilepic, id토큰을 서버로 전송.
    // eslint-disable-next-line no-console
    console.log(response);
  };
  const responseFail = error => {
    // eslint-disable-next-line no-console
    console.error(error);
  };
  return (
    <div>
      <h3>나는 집사다</h3>
      <form>
        <Input placeholder="E-mail" />
        <Input placeholder="Password" type="password" />
        <Button text="Login" />
      </form>
      <Link to="/signup">
        <span>회원가입</span>
      </Link>
      <Link to="/findpassword">
        <span>비밀번호 찾기</span>
      </Link>
      <GoogleLogin
        clientId={config.GOOGLE_LOGIN_CLIENT_ID}
        buttonText="Login With Google"
        onSuccess={responseSuccess}
        onFailure={responseFail}
        cookiePolicy="single_host_origin"
      />
      <KakaoLogin
        jsKey={config.KAKAO_LOGIN_JS_KEY}
        onSuccess={responseSuccess}
        onFailure={responseFail}
        getProfile
      />
    </div>
  );
};

export default Login;
