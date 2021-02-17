import React, { Component } from "react";

export default class CHECKBOX extends Component {
    render() {
        return (<input type="checkbox" {...this.props} >
                        {this.props.children}
                </input>)
    }
}
