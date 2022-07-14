import React, { ComponentProps } from "react";
import { Story } from "@storybook/react/types-6-0";
import { action } from "@storybook/addon-actions";
import DateInputFC from "../date/date/dateInputFC"

export default {
  title: "Date",
  component: DateInputFC
};
const Template: Story<ComponentProps<typeof DateInputFC>> = (args) => 
(
  <DateInputFC {...args} />
);

export const InitializeControl = Template.bind({});
InitializeControl.args = {
  value: new Date("12/12/2022"),
  disabled: false,
  required: false,
  hidden: false,
  hasFieldset: false,
  inputMode:  "", 
  titleRef:"When do you think you will fill in this input?",
  attributeRef: undefined,
  hintRef: "",
  helptitleRef: "",
  helpmessageRef: "",
  sendDate: action("onChange")

};
