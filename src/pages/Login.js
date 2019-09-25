import React from "react";
import { Link } from "react-router-dom";
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
      <Link to="/signup">
        <span>회원가입</span>
      </Link>
      <Link to="/findpassword">
        <span>비밀번호 찾기</span>
      </Link>
      <Button text="Login with Google" />
      <Button text="Login with Kakao" />
    </div>
  );
};

export default Login;
