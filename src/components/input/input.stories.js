import React from "react";
import { storiesOf } from "@storybook/react";
import Input from "components/input/Input";

storiesOf("Input", module)
  .add("default input", () => <Input placeholder="Default Input" />)
  .add("password input", () => <Input placeholder="Password Input" type="password" />);
