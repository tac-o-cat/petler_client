import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Button from "./Button";

storiesOf("Button", module)
  .add("default button", () => <Button text="button" onClick={action("Button Clicked")} />)
  .add("disabled button", () => (
    <Button text="button" isDisabled handleClick={action("Button Clicked")} />
  ));
