import React from "react";
import Input from "./Input";

export default { title: "Input" };

export const emailInput = () => <Input placeholder="Email" />;
export const passwordInput = () => <Input placeholder="Password" inputType="password" />;
