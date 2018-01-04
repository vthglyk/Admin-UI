import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';

export const FieldError = ({error}) => {
    if (error)
        return (
            <Alert bsStyle="danger">
                <strong>{error}</strong>
            </Alert>
        );
    else
        return null;
};

export class AlertDismissable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            style : props.style,
            errorMessage : props.errorMessage
        };

    }

    componentWillReceiveProps(nextProps) {
        // Check next stater on an unneeded render
        if (nextProps.errorMessage !== this.state.errorMessage) {
            this.setState({
                style : nextProps.style,
                errorMessage : nextProps.errorMessage
            });
        }
    }


    render() {
        const { style, errorMessage } = this.state;
        if (errorMessage)
            return (
                <Alert bsStyle={style} onDismiss={this.props.dismissHandler}>
                    <strong>{errorMessage}</strong>
                </Alert>
            );
        else
            return null;
    }
}