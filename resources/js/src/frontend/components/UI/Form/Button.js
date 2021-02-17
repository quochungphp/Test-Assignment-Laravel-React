import React, { Component } from "react";

export default class BUTTON extends Component {
    render() {
        return (<button {...this.props}>
                        {this.props.children}
                </button>)
    }
}
