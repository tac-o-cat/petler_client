import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "components/Button/Button";
import Input from "components/input/Input";

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
          <Input placeholder="Username" />
          <Input placeholder="Password" type="password" />
          <Input placeholder="Confirm Password" type="password" />
          <Button onClick={this.handleEdit}>수정</Button>
        </form>
        <Button onClick={this.handleLogout}>로그아웃</Button>
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
