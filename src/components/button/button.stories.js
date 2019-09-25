import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Button from "components/Button/Button";

storiesOf("Button", module)
  .add("default button", () => <Button onClick={action("Button Clicked")}>버튼</Button>)
  .add("disabled button", () => (
    <Button disabled handleClick={action("Button Clicked")}>
      비활성화 버튼
    </Button>
  ))
  .add("a tag button", () => (
    <Button as="a" href="#">
      링크 버튼
    </Button>
  ))
  .add("button with emoji", () => (
    <Button>
      <span role="img" aria-label="sheep">
        🐑
      </span>
      이모지 버튼
    </Button>
  ));
