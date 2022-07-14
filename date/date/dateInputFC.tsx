import React, { useState, useEffect, ChangeEvent } from "react";
import { DateField } from 'govuk-react'
import {IGdsInputProps as IGdsInputProps, makeComponent} from "../../src/main"; 
 const inputComponent: React.FC<IGdsInputProps>  = (props) => {
  const { value, onChange, disabled, required, hidden, inputMode , titleRef, attributeRef, hintRef, helptitleRef, helpmessageRef, hasFieldset, sendDate} = props;
  useEffect(() => {}, [value]);
  if (hidden) return <span />;
  let day = "";
  let month = "";
  let year = "";
  if (value != null && value != undefined && Date.parse(value.toString()) != NaN)
  {
    day = (value as Date).getDate().toString();
    month = ((value as Date).getMonth() +1).toString();
    year = (value as Date).getFullYear().toString();
  }

  return (

<DateField
  id = {attributeRef+"_gds"}

  defaultValues={{
    day: day,
    month: month,
    year: year,
  }}
  input={{ 
        
 onChange : function(e)
 {
    let field =   document.getElementById(attributeRef+"_gds");
    if (field != null && field != undefined)
    {
   // We will use the completeDate bool to tell us what we should do with the date value behind the inputs.
    let inputs =  field.getElementsByTagName("input");
    var completeDate = false;
    (inputs != null && inputs != undefined)
    {
      console.log(inputs.length);
      if (inputs.length == 3)
      {
        let dayInput = inputs[0];
        let monthInput = inputs[1];
        let yearInput = inputs[2];
        console.log(dayInput.value, monthInput.value, yearInput.value);
        if  (dayInput != null && dayInput != undefined&&
        monthInput != null && monthInput != undefined && yearInput != null 
        && yearInput != undefined
        &&
        dayInput.value != null && dayInput.value != undefined&&
        monthInput.value != null && monthInput.value != undefined && yearInput.value != null 
       && yearInput.value != undefined)
        {
		// Gov front end doesn't want us to set the input type of these to "number" preventing users from accidentally including other characters if not on phone
		// They get immediately stripped out below which mimics the effect.
		const CLEAN_YEAR = yearInput.value.replace(/[^0-9]+/g, "");
		if (CLEAN_YEAR != yearInput.value) {
			yearInput.value = CLEAN_YEAR;
		}
		const CLEAN_MONTH = monthInput.value.replace(/[^0-9]+/g, "");
		if (CLEAN_MONTH != monthInput.value) {
			monthInput.value = CLEAN_MONTH;
		}
		const CLEAN_DAY = dayInput.value.replace(/[^0-9]+/g, "");
		if (CLEAN_DAY != dayInput.value) {
			dayInput.value = CLEAN_DAY;
		}
		// We now also stipulate the max char length of these controls for these elements in case HTML5 atts aren't supported
		if (

			yearInput.value.length > 4
		) {
			yearInput.value = yearInput.value.substring(0, 4);
		}
		if (

			monthInput.value.length > 2
		) {
			monthInput.value = monthInput.value.substring(0, 2);
		}
		if (
			dayInput.value.length > 2
		) 
    {
			dayInput.value = dayInput.value.substring(0, 2);
		}

		// No month 13
		if ((monthInput.value as any as number) > 12) 
    {
			monthInput.setAttribute("value", "0");
			monthInput.value = "1";
		}
		// If we have come this far and now have a valid month and year input we can find out how many days are in this month.
		// THANKS ROMANS.
		if (
			monthInput.value != "" &&
			monthInput.value != null &&
			monthInput.value != undefined &&
			yearInput.value != "" &&
			yearInput.value != null &&
			yearInput.value != undefined &&
			yearInput.value.length == 4
		) {
			monthInput.setAttribute("value", monthInput.toString());
			yearInput.setAttribute("value", yearInput.toString());
			let rawNumberYear = yearInput.value as any as number;
			let rawNumberMonth = (monthInput.value as any as number) - 1;

			let newValue = new Date(rawNumberYear, rawNumberMonth);

			let daysInMonth = new Date(	rawNumberYear, rawNumberMonth + 1, 0).getDate();			
			if (
				dayInput.value != "" &&
				dayInput.value != null &&
				dayInput.value != undefined
			) {
				if ((dayInput.value as any as number) > daysInMonth) 
				{
					dayInput.setAttribute("value", "1");
					dayInput.value = "1";
				}
				newValue.setDate(dayInput.value as any as number);
				completeDate = true;
			}
			// Set the date to a value or kill it.
			if (completeDate) 
			{
        sendDate!(newValue);
        
			} 
		
		}
        }
      }
    }
    if (completeDate != true)
    {
      sendDate!(null);
    }
      
    }
   
  }
  }
 
  }
>

</DateField>

  );
};
const DateInputFC: React.FC<IGdsInputProps> = (props) => {
  const { value, onChange, disabled, required, hidden, inputMode , titleRef, attributeRef, hintRef, helptitleRef, helpmessageRef, hasFieldset, sendDate} = props;
  useEffect(() => {}, [value]);
  let component = inputComponent(props);
  inputComponent(props); 
  return (
  makeComponent(props, component)
          );
};
export default DateInputFC;