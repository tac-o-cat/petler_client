import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const InputContainer = styled.input``;

const Input = props => {
  const { placeholder, type } = props;
  return <InputContainer placeholder={placeholder} type={type} />;
};

Input.defaultProps = {
  type: "text",
};

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default Input;
