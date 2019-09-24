import React from "react";
import Input from "../components/input/Input";
import Button from "../components/button/Button";

const Login = () => {
  return (
    <div>
      <h3>나는 집사다</h3>
      <form>
        <Input placeholder="E-mail" />
        <Input placeholder="Password" type="password" />
        <Button text="Login" />
      </form>
      <span>회원가입/비밀번호 찾기</span>
      <Button text="Login with Google" />
      <Button text="Login with Kakao" />
    </div>
  );
};

export default Login;
