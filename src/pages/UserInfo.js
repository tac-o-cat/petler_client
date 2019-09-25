import React, { Component } from "react";
import PropTypes from "prop-types";

class UserInfo extends Component {
  state = {
    /* imageUrl: "" */
  };

  handleEdit = e => {
    e.preventDefault();
    // input value를 받아 서버에 보내주는 로직 추가 필요.
  };

  handleLogout = () => {
    // 향후 유저 인증 파기하는 로직 추가 필요.
    const { history } = this.props;
    history.push("/");
  };

  render() {
    return (
      <>
        <h3>유저 정보 수정</h3>
        <form>
          <input placeholder="Username" />
          <input placeholder="Password" type="password" />
          <input placeholder="Confirm Password" type="password" />
          <button type="button" onClick={this.handleEdit}>
            수정
          </button>
        </form>
        <button type="button" onClick={this.handleLogout}>
          로그아웃
        </button>
      </>
    );
  }
}

UserInfo.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default UserInfo;
