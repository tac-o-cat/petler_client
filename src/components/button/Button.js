import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const ButtonContainer = styled.button``;

export default function Button(props) {
  const { text, isDisabled } = props;
  return <ButtonContainer disabled={isDisabled}>{text}</ButtonContainer>;
}

Button.defaultProps = {
  isDisabled: false,
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
};
