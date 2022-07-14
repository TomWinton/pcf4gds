import React, { useState, useEffect } from "react";
import { MultiChoice, Radio } from 'govuk-react'
import {IGdsInputProps as IGdsInputProps, makeComponent, OptionValues} from  "../../src/main"; 

const optionComponent: React.FC<IGdsInputProps>  = (props) => {
  const { value, onChange, disabled, required, hidden, inputMode , titleRef, attributeRef, hintRef, helptitleRef, helpmessageRef, hasFieldset, options} = props;
  useEffect(() => {}, [value]);
  if (hidden || options == null || options == undefined) {
    return  (<span />)
  }
   let sortedOptions = options.sort((a, b) => a.Label.localeCompare(b.Label));
  
   return(
    <div id = {attributeRef+"_gds"}>
{sortedOptions.map(e=> 

      <Radio
  value = {e.Value}
  name={attributeRef+"_gds"}
  id = {attributeRef+"_gds" + e.Value}
  key = {attributeRef+"_gds" + e.Value}
  onChange={(e) =>   onChange(e)}
  defaultChecked={value != null && value != undefined && e.Value.toString() == value.toString()  ? true : false}
>
  {e.Label}
</Radio>
    )}
 
    </div>
       )
       
  }
  


const OptionInputFC: React.FC<IGdsInputProps> = (props) => {
  const { value, onChange, disabled, required, hidden, inputMode , titleRef, attributeRef, hintRef, helptitleRef, helpmessageRef, hasFieldset, options} = props;
  useEffect(() => {}, [value]);
  let component = optionComponent(props);

  return (
    makeComponent(props, component)
        );
};
export default OptionInputFC;