import React from "react";
import PropTypes from "prop-types";

const FindPassword = ({ history }) => {
  return (
    <div>
      <h3>비밀번호 찾기</h3>
      <form>
        <input placeholder="E-mail" />
        <button type="button">확인</button>
      </form>
      <button type="button" onClick={history.goBack}>
        뒤로 가기
      </button>
    </div>
  );
};

FindPassword.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default FindPassword;
