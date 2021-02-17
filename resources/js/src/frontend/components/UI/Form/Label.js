import React, { Component } from "react";
import Error from './Error';
export default class LABEL extends Component {
    render() {
        let {
            groupClass,
            errorClass,
            labelClass,
            labelTitle,
            fieldGroupClass,
            errorMessage,
            hasError,
            ...other
        } = this.props;

        if (!hasError) {
            hasError = false;
        }
        if (!groupClass) {
            groupClass = "form-group";
        }
        if (!errorClass) {
            errorClass = "has-error";
        }
        if (!labelClass) {
            labelClass = "control-label";
        }
        if (!labelTitle) {
            labelTitle = "";
        }
        if (!fieldGroupClass) {
            fieldGroupClass = "";
        }
        if (!errorMessage) {
            errorMessage = "";
        } else {
            errorMessage = <Error>{errorMessage}</Error>
        }

        return (
            <div className={groupClass + ((hasError)?(" " + errorClass):"")}>
                {(labelTitle) ? <label className={labelClass}>{labelTitle}</label> : ''}
                <div className={fieldGroupClass}>
                    {this.props.children}
                    {errorMessage}
                </div>
            </div>
        )
    }
}
