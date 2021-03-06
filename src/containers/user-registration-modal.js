import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Modal, Button, FormControl, InputGroup, Glyphicon } from "react-bootstrap";
import RFReactSelect from "../helpers/redux-form-react-selector-integrator";
import { changeModalState } from "../actions/index";
import { USER_REGISTRATION_MODAL } from "../reducers/modal-reducer";
import { FieldError } from "../helpers/errors";
import {fetchUserRoles, registerUser} from "../actions/user-actions";

class UserRegistrationModal extends Component {

    componentWillMount() {
        this.props.fetchUserRoles();
    }

    open() {
        this.props.changeModalState(USER_REGISTRATION_MODAL, true)
    }

    close() {
        this.props.changeModalState(USER_REGISTRATION_MODAL, false)
    }

    onSubmit(props) {
        this.props.registerUser(props, () => {
            this.props.changeModalState(USER_REGISTRATION_MODAL, false);
            this.props.history.push('/administration/success');
        });
    }

    roles = () => {
        return _.map(this.props.userRoles.data, (role) => {
            return({ value: role.enumValue, label: role.enumText });
        });
    };

    renderInputField = (field) => {
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
    };

    render() {
        const { userRegistrationState : { validationErrors, errorMessage },
            userRoles, modalState, handleSubmit } = this.props;

        return(
            <Fragment>
                <Button
                    className="register button"
                    bsStyle="primary"
                    onClick={this.open.bind(this)}>
                    Register
                </Button>
                <Modal show={modalState[USER_REGISTRATION_MODAL]} onHide={this.close.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Registration</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <Modal.Body>
                            <FieldError error={errorMessage} />

                            <Field
                                type="text" error={validationErrors.validUsername}
                                icon="user" placeholder="Username"
                                name="validUsername" component={this.renderInputField}
                            />
                            <FieldError error={validationErrors.validUsername} />

                            <Field
                                type="password"
                                icon="lock" placeholder="Password"
                                name="validPassword" component={this.renderInputField}
                            />
                            <FieldError error={validationErrors.validPassword} />

                            <Field
                                type="text"
                                icon="envelope" placeholder="Email"
                                name="recoveryMail" component={this.renderInputField}
                            />
                            <FieldError error={validationErrors.recoveryMail} />

                            <InputGroup id="user-role-input-group">
                                <Field
                                    options={this.roles()}
                                    placeholder="Choose your User Role"
                                    name="role" component={RFReactSelect}
                                />
                            </InputGroup>
                            <FieldError error={userRoles.error} />
                            <FieldError error={validationErrors.role} />

                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="submit" bsStyle="primary">Register</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        userRoles: state.userRoles,
        userRegistrationState: state.userRegistrationState,
        modalState: state.modalState
    };
}

export default reduxForm({
    form: 'RegisterUserForm'
})(
    connect(mapStateToProps, { fetchUserRoles, registerUser, changeModalState })(UserRegistrationModal)
);