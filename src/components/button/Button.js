import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const ButtonContainer = styled.button``;

const Button = props => {
  const { text, isDisabled, onClick } = props;
  return (
    <ButtonContainer disabled={isDisabled} onClick={onClick}>
      {text}
    </ButtonContainer>
  );
};

Button.defaultProps = {
  isDisabled: false,
  onClick: () => {},
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  isDisabled: PropTypes.bool,
};

export default Button;
