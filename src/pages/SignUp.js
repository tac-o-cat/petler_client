import React from "react";
import PropTypes from "prop-types";
import Input from "components/input/Input";
import Button from "components/Button/Button";

const SignUp = ({ history }) => {
  return (
    <div>
      <h3>회원가입</h3>
      <form>
        <Input placeholder="E-mail" />
        <Input placeholder="Username" />
        <Input placeholder="Password" type="password" />
        <Input placeholder="Confirm Password" type="password" />
        <Button text="회원 가입" />
      </form>
      <Button text="뒤로 가기" onClick={history.goBack} />
    </div>
  );
};

SignUp.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default SignUp;
