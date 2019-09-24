import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const InputContainer = styled.input``;

const Input = props => {
  const { placeholder, inputType } = props;
  return <InputContainer placeholder={placeholder} type={inputType} />;
};

Input.defaultProps = {
  inputType: "text",
};

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  inputType: PropTypes.string,
};

export default Input;
