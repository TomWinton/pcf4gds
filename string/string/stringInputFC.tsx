import React, { useState, useEffect } from "react";
import { Input } from 'govuk-react'
import {IGdsInputProps as IGdsInputProps, makeComponent} from "../../src/main"; 

 const inputComponent: React.FC<IGdsInputProps>  = (props) => {
  const { value, onChange, disabled, required, hidden, inputMode , titleRef, attributeRef, hintRef, helptitleRef, helpmessageRef, hasFieldset} = props;
  useEffect(() => {}, [value]);
  if (hidden) return <Input />;

  return (
    <Input
    onChange={(e) => onChange(e)}
    defaultValue = {value!.toString()}
    inputMode = {"text"}
    id = {attributeRef+"_gds"}
    >
    </Input>
  );
};
const StringInputFC: React.FC<IGdsInputProps> = (props) => {
  const { value, onChange, disabled, required, hidden, inputMode , titleRef, attributeRef, hintRef, helptitleRef, helpmessageRef, hasFieldset} = props;
  useEffect(() => {}, [value]);
  let component = inputComponent(props);
  inputComponent(props); 
  return (
    makeComponent(props, component)
          );
};
export default StringInputFC;