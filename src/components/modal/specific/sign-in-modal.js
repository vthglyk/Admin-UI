import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Modal, Button, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import { LOGIN_MODAL } from "../../../reducers/modal-reducer";
import { userLogin, changeModalState } from "../../../actions";

class SignInModal extends Component {

    open() {
        this.props.changeModalState(LOGIN_MODAL, true)
    }

    close() {
        this.props.changeModalState(LOGIN_MODAL, false)
    }

    onSubmit(props) {
        this.props.userLogin(props, () => {
            console.log(props);
            this.props.changeModalState(LOGIN_MODAL, false);
            this.props.history.push('/administration/user/cpanel');
        });
    }

    renderInputField(field) {
        const { input, type, placeholder, icon } = field;
        return (
            <InputGroup>
                <InputGroup.Addon>
                    <Glyphicon glyph={icon}/>
                </InputGroup.Addon>
                <FormControl
                    {...input}
                    type={type}
                    placeholder={placeholder} />
            </InputGroup>
        );
    }

    render() {
        const { handleSubmit, modalState } = this.props;

        return(
            <Fragment>
                <Button
                    className="login button"
                    bsStyle="primary"
                    onClick={this.open.bind(this)}>
                    Sign In
                </Button>

                <Modal show={modalState[LOGIN_MODAL]} onHide={this.close.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Sign In</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <Modal.Body>
                            <Field
                                type="text"
                                icon="user" placeholder="Username"
                                name="username" component={this.renderInputField}
                            />

                            <Field
                                type="text"
                                icon="lock" placeholder="Password"
                                name="password" component={this.renderInputField}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="submit" bsStyle="primary">Login</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </Fragment>
        );
    }

}

function mapStateToProps(state) {
    return {
        modalState: state.modalState
    };
}

export default reduxForm({
    form: 'LoginForm'
})(
    connect(mapStateToProps, { userLogin, changeModalState })(SignInModal)
);