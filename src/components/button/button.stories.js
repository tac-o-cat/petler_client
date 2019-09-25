import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Button from "components/button/Button";

storiesOf("Button", module)
  .add("default button", () => (
    <Button text="button" onClick={action("Button Clicked")}>
      button
    </Button>
  ))
  .add("disabled button", () => (
    <Button isDisabled handleClick={action("Button Clicked")}>
      button
    </Button>
  ));
