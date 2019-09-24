import React from "react";
import styled from "styled-components";

const FormContainer = styled.form`
  max-width: 576px;
  padding: 1rem;
`;

export default function Form(props) {
  // eslint-disable-next-line react/prop-types
  const { children } = props;

  return <FormContainer>{children}</FormContainer>;
}
