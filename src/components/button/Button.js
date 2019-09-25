import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const ButtonContainer = styled.button``;

const Button = props => {
  // eslint-disable-next-line react/prop-types
  const { children, isDisabled, onClick } = props;
  return (
    <ButtonContainer disabled={isDisabled} onClick={onClick}>
      {children}
    </ButtonContainer>
  );
};

Button.defaultProps = {
  isDisabled: false,
  onClick: () => {},
};

Button.propTypes = {
  onClick: PropTypes.func,
  isDisabled: PropTypes.bool,
};

export default Button;
