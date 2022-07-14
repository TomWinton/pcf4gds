import React, { useState, useEffect, ChangeEvent } from "react";
import { Input, Fieldset, Label, FormGroup, Details , HintText, LabelText} from 'govuk-react'

export interface IGdsInputProps 
{
    value: string | number | Date | null| undefined;
    disabled: boolean;
    required: boolean;
    hidden: boolean;
    hasFieldset: boolean;
    inputMode: string;
    titleRef? : string | null | undefined;
    attributeRef : string | null | undefined;
    hintRef? : string | null | undefined;
    helptitleRef? : string | null | undefined;
    helpmessageRef? : string | null | undefined;   
    options?: OptionValues[] ; 
    onChange: (value: ChangeEvent) => void;
    sendDate?: (value: Date | null | undefined)   => void ;
  }

  export function getAttributeRef(attributeRef: string | null | undefined): string 
  {
    let toReturn = "";
    if (attributeRef != null) 
    {
      toReturn = attributeRef.replace(/\s/g, "");
      if (toReturn.length > 0) 
      {
        return toReturn;
      }
    }
    toReturn = (Math.random() + 1).toString(36).substring(7);
    return toReturn;
  }
  export const makeComponent: React.FC<IGdsInputProps>  = (props, input :React.FC<IGdsInputProps> ) => {
    const { value, onChange, disabled, required, hidden, inputMode , titleRef, attributeRef, hintRef, helptitleRef, helpmessageRef, hasFieldset} = props;
 
    // getAttributeRef(attributeRef).toString();
    let detailsText: React.FC<IGdsInputProps> | null = () => 
    {
        console.log("detailsText called")
        if(helpmessageRef != null && helpmessageRef != undefined && helpmessageRef.length > 0 
            && helptitleRef != null && helptitleRef != undefined && helptitleRef.length > 0
        )
        {
            console.log("should return");
            let summaryTitle : React.ReactNode = 
            <summary className="govuk-details__summary">
                <span className="govuk-details__summary-text">{helptitleRef}</span>
                </summary>
            let summaryText : React.ReactNode = <div className="govuk-details__text">{helpmessageRef}</div>
            return <Details
             summary = {summaryTitle}>
                        {summaryText}       
            </Details>

        }
        return null
    }

    const hintText = detailsText;
    return (
      <Fieldset>
<FormGroup>
  <>

    {titleRef != null && titleRef != undefined && titleRef.length > 0 ? 
    <Label htmlFor={attributeRef+"_gds"}><LabelText className="govuk-label govuk-label--m">{titleRef}</LabelText></Label>
    : 
    null}  
   {hintRef != null && hintRef != undefined && hintRef.length > 0 ? 
   <HintText id={attributeRef+"_gds-hint"}>{hintRef}</HintText>
    : 
    null}  
    {
        ((helpmessageRef != null && helpmessageRef != undefined && helpmessageRef.length > 0 
            && helptitleRef != null && helptitleRef != undefined && helptitleRef.length > 0) ? 
            <Details
             summary ={helptitleRef}>
            {helpmessageRef}    
            </Details>
            : null
        )
    }

    {input}
    </>
</FormGroup>
</Fieldset>
    );
  };
  export class OptionValues 
  {
    Label: string;
    Value: number;
    constructor(display: string, value: number) 
    {
      this.Label = display;
      this.Value = value;
    }
  }

  