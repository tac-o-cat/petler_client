import React from "react";
import PropTypes from "prop-types";

const SignUp = ({ history }) => {
  return (
    <div>
      <h3>회원가입</h3>
      <form>
        <input placeholder="E-mail" />
        <input placeholder="Username" />
        <input placeholder="Password" type="password" />
        <input placeholder="Confirm Password" type="password" />
        <button type="button">회원 가입</button>
      </form>
      <button type="button" onClick={history.goBack}>
        뒤로 가기
      </button>
    </div>
  );
};

SignUp.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default SignUp;
