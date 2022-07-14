import React, { ComponentProps } from "react";
import { Story } from "@storybook/react/types-6-0";
import { action } from "@storybook/addon-actions";
import OptionInputFC from "../option/option/OptionInputFC";
import {OptionValues} from "../src/main";

export default {
  title: "Option",
  component: OptionInputFC
};

const Template: Story<ComponentProps<typeof OptionInputFC>> = (args) => (
  <OptionInputFC {...args} />
);

export const InitializeControl = Template.bind({});
InitializeControl.args = {
  value: 2,
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
  options: [
    {
        "Label": "Hotel",
        "Value": 0
    },
    {
        "Label": "Motel",
        "Value": 1
    },
    {
        "Label": "zHoliday Inn",
        "Value": 2
    }
],
  onChange: action("onChange") ,

};
