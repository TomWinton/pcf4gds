import React, { ChangeEvent } from "react";
import ReactDOM from "react-dom";
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import SP from "./stringInputFC";

//import {getAttributeRef} from "../../main";
import {getAttributeRef} from "../../src/main"
export class ctStringInputGds

  implements ComponentFramework.StandardControl<IInputs, IOutputs> {
  constructor(
    private container: HTMLDivElement,
    private notifyOutputChanged: () => void,
    private value: string,
    private formatString: string,
    private updatedByReact: boolean,
    private isControlDisabled: boolean,
    private isVisible: boolean,
    private attRef: string
  ) {
      
  } 
  /**
   * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
   * Data-set values are not initialized here, use updateView.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
   * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
   * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
   * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
   */
  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ): void {
    // Add control initialization code
    const { parameters, mode } = context,
      { stringInput } = parameters,
      { isControlDisabled, isVisible } = mode;

    this.container = container;
    this.notifyOutputChanged = notifyOutputChanged;
    this.value = (stringInput && stringInput.raw) || "";
    this.updatedByReact = false;
    this.isControlDisabled = isControlDisabled;
    this.isVisible = isVisible;
    this.attRef = getAttributeRef(context.parameters.attributeRef.raw)
  }

  /**
   * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
   */
  public updateView(context: ComponentFramework.Context<IInputs>): void {
    // Add code to update control view
    const { parameters, mode } = context,
      { stringInput } = parameters,
      { isControlDisabled, isVisible } = mode;

    if (this.updatedByReact) {
      this.updatedByReact = false;
      return;
    }

    this.value = (stringInput && stringInput.raw) || "";
    this.isControlDisabled = isControlDisabled;
    this.isVisible = isVisible;
//  const { value, onChange, disabled, required, hidden, inputMode , titleRef, attributeRef, hintRef, helptitleRef, helpmessageRef, hasFieldset} = props;

    ReactDOM.render(
      React.createElement(SP, {
        value: this.value,
        disabled: this.isControlDisabled,
        required: false,
        hidden: !this.isVisible,
        hasFieldset: false,
        inputMode:  "text", 
        titleRef: context.parameters.titleRef.raw,
        attributeRef: this.attRef,
        hintRef: context.parameters.hintRef.raw,
        helptitleRef: context.parameters.helptitleRef.raw,
        helpmessageRef: context.parameters.helpmessageRef.raw,
        onChange: (e: ChangeEvent) => {
         
          this.value = (e.currentTarget as HTMLInputElement).value;
          this.updatedByReact = true;
          this.notifyOutputChanged();
          
        }
       
      }),
      this.container
    );
  }

  /**
   * It is called by the framework prior to a control receiving new data.
   * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
   */
  public getOutputs(): IOutputs {
    return { stringInput: this.value };
  }

  /**
   * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
   * i.e. cancelling any pending remote calls, removing listeners, etc.
   */
  public destroy(): void {
    // Add code to cleanup control if necessary
    ReactDOM.unmountComponentAtNode(this.container);
  }
}
