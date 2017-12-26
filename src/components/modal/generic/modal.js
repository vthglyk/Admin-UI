import React from 'react';
import AppendBodyComponent from '../../append-body-component';
import ModalContent from './modal-content';
import uuid from '../../../helpers/uuid';

export default class Modal extends AppendBodyComponent {
    constructor(props) {
        super(props);

        this.uniqueId = props.id ? props.id : uuid();
        this.setAppendElementId(this.uniqueId);
    }

    componentDidMount() {
        this.updateSelf();
    }

    componentDidUpdate() {
        this.updateSelf();
    }

    componentWillUnmount() {
        this.removeAppendElement();
    }

    updateSelf() {
        this.updateAppendElement(
            <div key={this.uniqueId}
                 id={this.uniqueId}
                 className="modal fade"
                 role="dialog">
                <div className="modal-dialog">
                    <ModalContent>
                        {this.props.children}
                    </ModalContent>
                </div>
            </div>
        );
    }

    render() {
        // Rendering is managed by ourselves since this appends a component to the DOM
        return null;
    }
}