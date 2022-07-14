"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionValues = exports.makeComponent = exports.getAttributeRef = void 0;
const react_1 = __importDefault(require("react"));
const govuk_react_1 = require("govuk-react");
function getAttributeRef(attributeRef) {
    let toReturn = "";
    if (attributeRef != null) {
        toReturn = attributeRef.replace(/\s/g, "");
        if (toReturn.length > 0) {
            return toReturn;
        }
    }
    toReturn = (Math.random() + 1).toString(36).substring(7);
    return toReturn;
}
exports.getAttributeRef = getAttributeRef;
const makeComponent = (props, input) => {
    const { value, onChange, disabled, required, hidden, inputMode, titleRef, attributeRef, hintRef, helptitleRef, helpmessageRef, hasFieldset } = props;
    // getAttributeRef(attributeRef).toString();
    let detailsText = () => {
        console.log("detailsText called");
        if (helpmessageRef != null && helpmessageRef != undefined && helpmessageRef.length > 0
            && helptitleRef != null && helptitleRef != undefined && helptitleRef.length > 0) {
            console.log("should return");
            let summaryTitle = react_1.default.createElement("summary", { className: "govuk-details__summary" },
                react_1.default.createElement("span", { className: "govuk-details__summary-text" }, helptitleRef));
            let summaryText = react_1.default.createElement("div", { className: "govuk-details__text" }, helpmessageRef);
            return react_1.default.createElement(govuk_react_1.Details, { summary: summaryTitle }, summaryText);
        }
        return null;
    };
    const hintText = detailsText;
    return (react_1.default.createElement(govuk_react_1.Fieldset, null,
        react_1.default.createElement(govuk_react_1.FormGroup, null,
            react_1.default.createElement(react_1.default.Fragment, null,
                titleRef != null && titleRef != undefined && titleRef.length > 0 ?
                    react_1.default.createElement(govuk_react_1.Label, { htmlFor: attributeRef + "_gds" },
                        react_1.default.createElement(govuk_react_1.LabelText, { className: "govuk-label govuk-label--m" }, titleRef))
                    :
                        null,
                hintRef != null && hintRef != undefined && hintRef.length > 0 ?
                    react_1.default.createElement(govuk_react_1.HintText, { id: attributeRef + "_gds-hint" }, hintRef)
                    :
                        null,
                ((helpmessageRef != null && helpmessageRef != undefined && helpmessageRef.length > 0
                    && helptitleRef != null && helptitleRef != undefined && helptitleRef.length > 0) ?
                    react_1.default.createElement(govuk_react_1.Details, { summary: helptitleRef }, helpmessageRef)
                    : null),
                input))));
};
exports.makeComponent = makeComponent;
class OptionValues {
    constructor(display, value) {
        this.Label = display;
        this.Value = value;
    }
}
exports.OptionValues = OptionValues;
