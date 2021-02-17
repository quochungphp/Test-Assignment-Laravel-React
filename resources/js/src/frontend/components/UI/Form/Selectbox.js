import React, { Component } from "react";
import Error from './Error';

export default class SELECT extends Component {
    componentDidMount() {
        let _this = this;

        if (_this.props.multiple === 'multiple') {
            let options = this.props.options;
            let arrOptions = options;
            if (!Array.isArray(options)) {
                arrOptions = [];
                Object.keys(options).map((key) => {
                    arrOptions.push({key: key, value: options[key]});
                });
            }
            let allOptionVal = [];
            arrOptions.map((obj) => {
                allOptionVal.push(String(obj.key));
            });
            $('#' + _this.props.id).multiselect({
                buttonWidth: '100%',
                nonSelectedText: '',
                includeSelectAllOption: true,
                selectAllText:trans('messages.select_all'),
                onChange: function(element, checked) {
                    let name = $('#' + _this.props.id).attr('name');
                    _this.props.handleChangeMultiSelect(name, element[0].value, checked);
                },
                onSelectAll: function() {
                    let name = $('#' + _this.props.id).attr('name');
                    _this.props.handleChangeMultiSelect(name, allOptionVal, true);
                },
                onDeselectAll: function() {
                    let name = $('#' + _this.props.id).attr('name');
                    _this.props.handleChangeMultiSelect(name, [], false);
                }
            });
            let value = this.props.valueMulti;
            if (typeof value !== 'undefined') {
                if (!Array.isArray(value)) {
                    $('#' + this.props.id).multiselect('select', value);
                } else {
                    for (let i = 0; i < value.length; i++) {
                        $('#' + this.props.id).multiselect('select', value[i]);
                    }
                }

            }
        }
    }

    componentDidUpdate() {
        if (this.props.multiple === 'multiple') {
            let value = this.props.valueMulti;
            if (!value) {
                $('#' + this.props.id).multiselect('deselectAll', false);
                $('#' + this.props.id).multiselect('updateButtonText');
            } else {
                $('#' + this.props.id).multiselect('deselectAll', false);
                if (!Array.isArray(value)) {
                    $('#' + this.props.id).multiselect('select', value);
                } else {
                    for (let i = 0; i < value.length; i++) {
                        $('#' + this.props.id).multiselect('select', value[i]);
                    }
                }
            }
        }
    }
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
            optionClass,
            options,
            handleChangeMultiSelect,
            valueMulti,
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
        if (!optionClass) {
            optionClass = '';
        }
        if (!options) {
            options = {};
        }
        let arrOptions = options;
        if (!Array.isArray(options)) {
            arrOptions = [];
            Object.keys(options).map((key) => {
                arrOptions.push({key: key, value: options[key]});
            });
        }

        let optionComponent = arrOptions.map((obj) => {
            if (this.props.readOnly === true && typeof this.props.readOnly !== undefined) {
                if (obj.key !== this.props.value){
                    return (<option key={obj.key} disabled="disabled"  value={obj.key}>{obj.value}</option>);
                } else {
                    return (<option key={obj.key} value={obj.key}>{obj.value}</option>);
                }
            } else {
                return (<option key={obj.key} value={obj.key}>{obj.value}</option>);
            }
        });

        let isSm = false;
        if({...other}.className && {...other}.className.indexOf('input-sm') !== -1) {
            isSm = true;
        }
        let component = null;
        if (hasError) {
            if (errorPopup) {
                component = (
                    <div className={fieldGroupClass + " has-feedback"}>
                            <select {...other}>{optionComponent}</select>
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
                        <select {...other}>{optionComponent}</select>
                        <Error>{errorMessage}</Error>
                    </div>
                );
            }
        } else {
            component = (
                <div className={fieldGroupClass}>
                    <select {...other}>{optionComponent}</select>
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
}
