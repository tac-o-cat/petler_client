import React from "react";
import PropTypes from "prop-types";
import Button from "../components/button/Button";
import Input from "../components/input/Input";

const FindPassword = ({ history }) => {
  return (
    <div>
      <h3>비밀번호 찾기</h3>
      <form>
        <Input placeholder="E-mail" />
        <Button text="확인" />
      </form>
      <Button text="뒤로 가기" onClick={history.goBack} />
    </div>
  );
};

FindPassword.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default FindPassword;
