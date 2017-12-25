import React, { Fragment } from 'react';
import ModalButton from '../generic/modal-button';
import Modal from '../generic/modal';
import ModalHeader from '../generic/modal-header';
import ModalBody from '../generic/modal-body';
import ModalFooter from '../generic/modal-footer';

const SignInModal = () => {

    return(
        <Fragment>
            <ModalButton id="sign-in-btn" extraClasses="sign-in-btn"
                         target="#sign-in-modal" text="Sign In"/>
            <Modal id="sign-in-modal">
                <ModalHeader title="Sign In" />
                <ModalBody id="sign-in-modal-body">
                    <div className="input-group">
                        <span className="input-group-addon"><i className="glyphicon glyphicon-user"/></span>
                        <input id="login-username" type="text" className="form-control" name="username" value=""
                               placeholder="Username"/>
                    </div>

                    <div className="input-group">
                        <span className="input-group-addon"><i className="glyphicon glyphicon-lock"/></span>
                        <input id="login-password" type="password" className="form-control" name="password" value=""
                               placeholder="Password"/>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <div className="col-sm-12 controls">
                        <button id="singlebutton" type="submit"
                                name="singlebutton" className="btn btn-success">Login</button>
                        <a href="#" className="reminder">Forgot your password?</a>
                    </div>
                </ModalFooter>
            </Modal>
        </Fragment>
    );
};

export default SignInModal;