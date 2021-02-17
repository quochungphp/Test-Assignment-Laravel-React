import React, { Component } from "react";

export default class ERROR extends Component {
    render() {
        return (
                <span className="help-block">
                    <strong className="error-new-line text-danger">{this.props.children}</strong>
                </span>
            )
    }
}
