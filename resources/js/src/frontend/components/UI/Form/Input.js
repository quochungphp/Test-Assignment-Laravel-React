import React, { Component } from "react";
import Error from './Error';

export default class INPUT extends Component {
    render() {
        let {
            groupClass,
            errorClass,
            labelClass,
            labelTitle,
            fieldGroupClass,
            errorMessage,
            hasError,
            errorPopup,
            iconPrefix,
            iconPrefixClass,
            isRequire,
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
        let isSm = false;
        if({...other}.className && {...other}.className.indexOf('input-sm') !== -1) {
            isSm = true;
        }
        let component = null;
        if (hasError) {
            if (errorPopup) {
                component = (
                    <div className={fieldGroupClass + " has-feedback"}>
                            {iconPrefix && <span className="input-group-addon"><i className={iconPrefixClass}></i></span>}
                            <input {...other} />
                            <i
                                className="fa fa-times text-red form-control-feedback icon-error"
                                data-placement="top"
                                data-toggle="tooltip"
                                data-original-title={errorMessage}
                            ></i>
                    </div>
                );
            } else {
                component = (
                    <div className={fieldGroupClass}>
                        {iconPrefix && <span className="input-group-addon"><i className={iconPrefixClass}></i></span>}
                        <input {...other} />
                        <Error>{errorMessage}</Error>
                    </div>
                );
            }
        } else {
            component = (
                <div className={fieldGroupClass}>
                    {iconPrefix && <span className="input-group-addon"><i className={iconPrefixClass}></i></span>}
                    <input {...other} />
                </div>
            );
        }

        return (
            <div className={groupClass + ((hasError)?(" " + errorClass):"")}>
                {(labelTitle) ? <label className={labelClass}>{labelTitle}{isRequire && <span className="text-danger">＊</span>}</label> : ''}
                {component}
            </div>
        )
    }

    componentDidUpdate() {
        $('[data-toggle="tooltip"]').tooltip();
    }
}
