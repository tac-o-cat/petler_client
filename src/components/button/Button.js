import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledButton = styled.button`
  display: inline-block;
  height: 2.5rem;
  line-height: 2.5rem;
  padding: 0 1rem;
  box-sizing: border-box;
  border: 1px solid transparent;
  border-radius: 4px;
  background-color: #1ea7fd;
  color: #ffffff;
  font-size: 1rem;
  text-align: center;
  text-decoration: none;
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
  filter: saturate(${props => (props.disabled ? "25%" : "100%")});

  :hover {
    ${props => props.disabled && "saturate(150%)"}
  }

  :focus {
    outline: none;
  }

  :active {
    transform: translateY(1px);
    filter: saturate(150%);
  }
`;

const Button = props => {
  // eslint-disable-next-line react/prop-types
  const { children, onClick, $as, ...attrs } = props;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <StyledButton as={$as} {...attrs} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

Button.defaultProps = {
  onClick: () => {},
};

Button.propTypes = {
  onClick: PropTypes.func,
};

export default Button;
