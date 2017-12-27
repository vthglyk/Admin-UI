import React, { Component } from 'react';
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { fetchUserRoles, registerUser } from "../../../actions";
import ModalFooter from '../generic/modal-footer';
import ModalBody from '../generic/modal-body';
import RFReactSelect from '../../../helpers/redux-form-react-selector-integrator';
import { modal } from 'bootstrap';

class UserRegistrationForm extends Component {

    componentWillMount() {
        this.props.fetchUserRoles();
    }

    onSubmit(props) {
        this.props.registerUser(props, () => {
            // const registrationModal = document.querySelector('#user-registration-modal');
            // registrationModal.modal('hide');
            this.props.history.push('/administration/success');
        });
    }

    roles = () => {
        return _.map(this.props.userRoles.data, (role) => {
            return({ value: role.enumValue, label: role.enumText });
        });
    };

    fieldError = (error) => {
        return (
            error ?
                <div className="alert alert-danger">{error}</div> :
                ""
        );
    };

    renderInputField(field) {
        return (
            <div className="input-group">
                <span className="input-group-addon"><i className={`glyphicon ${field.icon}`} /></span>
                <input
                    {...field.input}
                    type={field.type} className="form-control"
                    placeholder={field.placeholder} />
            </div>
        );
    }

    render() {
        const { userRegistration : { validationErrors, errorMessage }, userRoles } = this.props;
        const { handleSubmit } = this.props;

        return(
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <ModalBody id="register-modal-body">
                    <Field
                        type="text"
                        icon = "glyphicon-user" placeholder="Username"
                        name="validUsername" component={this.renderInputField}
                    />
                    {this.fieldError(validationErrors.validUsername)}

                    <Field
                        type="password"
                        icon = "glyphicon-lock" placeholder="Password"
                        name="validPassword" component={this.renderInputField}
                    />
                    {this.fieldError(validationErrors.validPassword)}

                    <Field
                        type="text"
                        icon = "glyphicon-envelope" placeholder="Email"
                        name="recoveryMail" component={this.renderInputField}
                    />
                    {this.fieldError(validationErrors.recoveryMail)}

                    <div className="input-group" id="user-role-input-group">
                        <Field
                            options={this.roles()}
                            placeholder="Choose your User Role"
                            name="role" component={RFReactSelect}
                        />
                    </div>
                    {this.fieldError(userRoles.error)}
                    {this.fieldError(validationErrors.role)}
                    {this.fieldError(errorMessage)}
                </ModalBody>

                <ModalFooter>
                    <div className="col-sm-12 controls">
                        <button type="submit" id="register-btn"
                                name="register-btn" className="btn btn-primary">
                            Register
                        </button>
                    </div>
                </ModalFooter>
            </form>
        )
    }
}

function mapStateToProps(state) {
    return {
        userRoles: state.userRoles,
        userRegistration: state.userRegistration
    };
}

export default reduxForm({
    form: 'RegisterUserForm'
})(
    connect(mapStateToProps, { fetchUserRoles, registerUser })(UserRegistrationForm)
);
