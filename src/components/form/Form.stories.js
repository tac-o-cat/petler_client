import React from "react";
import { storiesOf } from "@storybook/react";
import { Container, Row, Col } from "react-grid-system";
import Form from "components/form/Form";
import Input from "components/input/Input";
import Button from "components/Button/Button";

storiesOf("Form", module).add("Form example", () => (
  <Form>
    <Container>
      <Row>
        <Col>
          <label htmlFor="emailField">이메일</label>
          <Input placeholder="asd" id="emailField" />
        </Col>
      </Row>
      <Row>
        <Col>
          <label htmlFor="passwordField">패스워드</label>
          <Input placeholder="asd" id="passwordField" />
        </Col>
      </Row>
      <Row>
        <Col style={{ textAlign: "right" }}>
          <Button>로그인</Button>
        </Col>
      </Row>
    </Container>
  </Form>
));
