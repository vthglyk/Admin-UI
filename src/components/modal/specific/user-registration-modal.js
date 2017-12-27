import React, { Component } from 'react';
import Modal from '../generic/modal';
import ModalHeader from '../generic/modal-header';
import UserRegistrationForm from './user-registration-form';

export default class UserRegistrationModal extends Component {
    render() {
        return(
            <Modal id="user-registration-modal">
                <ModalHeader title="Registration" />
                <UserRegistrationForm history={this.props.history}/>
            </Modal>
        );
    }
}
