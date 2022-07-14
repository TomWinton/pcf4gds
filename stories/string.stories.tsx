import React, { ComponentProps } from "react";
import { Story } from "@storybook/react/types-6-0";
import { action } from "@storybook/addon-actions";



import StringInputFC from "../string/string/stringInputFC";

export default {
  title: "String",
  component: StringInputFC
};

const Template: Story<ComponentProps<typeof StringInputFC>> = (args) => (
  <StringInputFC {...args} />
);

export const InitializeControl = Template.bind({});
InitializeControl.args = {
  value: "",
  disabled: false,
  required: false,
  hidden: false,
  hasFieldset: false,
  inputMode:  "text", 
  titleRef:"Wotcha Wotcha",
  attributeRef: undefined,
  hintRef: "Write something",
  helptitleRef: "Help with writing something",
  helpmessageRef: "bash your hands against the keyboard until something happens",
  onChange: action("onChange") 
};
