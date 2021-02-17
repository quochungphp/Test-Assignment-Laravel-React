import React, { Component } from "react";

export default class FORM extends Component {
    render() {
        let {onRef, baseUrl, dataSource, submitFormData, ...other} = this.props;
        return <form {...other}>{this.props.children}</form>;
    }
}
