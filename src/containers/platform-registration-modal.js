import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Modal, Button, FormGroup, FormControl, ControlLabel, Row, Col, HelpBlock } from "react-bootstrap";
import _ from "lodash";
import { PLATFORM_REGISTRATION_MODAL } from "../reducers/modal-reducer";
import RFReactSelect from "../helpers/redux-form-react-selector-integrator";
import { InterworkingService, Platform } from "../helpers/object-definitions";
import { getPlatformRegistrationValidity } from "../selectors/index";
import { FieldError, AlertDismissable } from "../helpers/errors";
import { getValidationState } from "../validation/helpers";
import {
    changeModalState, DISMISS_PLATFORM_REGISTRATION_ERROR_ALERT, DISMISS_PLATFORM_REGISTRATION_SUCCESS_ALERT,
    REMOVE_PLATFORM_REGISTRATION_ERRORS,
    removeErrors
} from "../actions/index";
import {
    dismissAlert} from "../actions/index";
import {
    validateId, validateName, validateDescription,
    validateInterworkingInterfaceUrl, validateInformationModel
} from "../validation/platform-registration-validation";
import { fetchAllInformationModels } from "../actions/info-model-actions";
import { registerPlatform} from "../actions/platform-actions";

class PlatformRegistrationModal extends Component {

    constructor() {
        super();
        this.platformTypes = [
            {
                label : "Platform",
                value : "false"
            },
            {
                label : "Enabler",
                value : "true"
            }
        ];
        this.typeDefault = "false";
    }

    componentDidMount() {
        this.props.fetchInformationModels();
    }

    open() {
        this.props.changeModalState(PLATFORM_REGISTRATION_MODAL, true);
    }

    close() {
        this.props.changeModalState(PLATFORM_REGISTRATION_MODAL, false);
        this.props.reset();
        this.props.removeErrors(REMOVE_PLATFORM_REGISTRATION_ERRORS);
    }

    informationModels = () => {
        return _.map(this.props.informationModels.availableInfoModels, (model) => {
            return({ value: model.id, label: model.name});
        });
    };

    dismissPlatformRegistrationSuccessAlert() {
        this.props.dismissAlert(DISMISS_PLATFORM_REGISTRATION_SUCCESS_ALERT)
    }

    dismissPlatformRegistrationErrorAlert() {
        this.props.dismissAlert(DISMISS_PLATFORM_REGISTRATION_ERROR_ALERT)
    }

    onSubmit(props) {
        let { id, name, description, interworkingServiceUrl, informationModel, type } = props;
        let descriptions = [];
        let interworkingServices = [];

        if (!id)
            id = "";

        if (!type)
            type = this.typeDefault;

        descriptions.push(description ? description : "");

        interworkingServices.push(new InterworkingService(interworkingServiceUrl, informationModel));
        
        const newPlatform = new Platform(id, name, descriptions, interworkingServices, type);

        this.props.registerPlatform(newPlatform, (res) => {
            if (res.status === 201) {
                this.close();
            }

        });
    }


    renderInputField = (field) => {
        const { input, type, placeholder, componentClass, rows, subElement, errorField,
            label, helpMessage, maxLength, meta : { touched, invalid, error } } = field;
        const validationState = getValidationState(input.value, touched, invalid);

        return (
            <FormGroup controlId={input.name} validationState={validationState}>
                {label ? <ControlLabel>{label}</ControlLabel> : ""}
                <FormControl
                    { ...input } componentClass={componentClass} rows={rows}
                    type={type} placeholder={placeholder} maxLength={maxLength} />
                <FormControl.Feedback className={subElement ? "sub-element" : ""}/>
                <HelpBlock>{validationState === "error" ? error : helpMessage}</HelpBlock>
                <FieldError error={errorField} />
            </FormGroup>
        );
    };

    render() {
        const { handleSubmit, modalState, informationModels,
            userPlatforms, platformRegistrationValidity } = this.props;
        const opts = { disabled : !platformRegistrationValidity };

        return(
            <Fragment>
                <Button
                    className="registration-btn"
                    bsStyle="info"
                    onClick={this.open.bind(this)}>
                    Register New Platform
                </Button>

                <AlertDismissable style="success" message={userPlatforms.successfulPlatformRegistration}
                                  dismissHandler={this.dismissPlatformRegistrationSuccessAlert.bind(this)} />

                <Modal show={modalState[PLATFORM_REGISTRATION_MODAL]} onHide={this.close.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Platform Registration</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <Modal.Body>
                            <AlertDismissable style="danger" message={userPlatforms.platformRegistrationError}
                                              dismissHandler={this.dismissPlatformRegistrationErrorAlert.bind(this)} />
                            <FieldError error={informationModels.fetching_error} />

                            <Row>
                                <Col sm={6}>
                                    <Field
                                        name="id" type="text" maxLength={30}
                                        label="Platform Id" placeholder="Enter preferred platform id"
                                        helpMessage={"From 4 to 30 characters. Include only letters, digits, '-' and" +
                                        " '_'. You can leave it empty for autogeneration"}
                                        errorField={userPlatforms.id_error}
                                        component={this.renderInputField}
                                    />
                                </Col>
                                <Col sm={6}>
                                    <Field
                                        name="name" type="text" maxLength={30}
                                        label="Platform Name" placeholder="Enter the platform name"
                                        helpMessage="From 3 to 30 characters"
                                        errorField={userPlatforms.name_error}
                                        component={this.renderInputField}
                                    />
                                </Col>
                            </Row>
                            <Field
                                name="description" componentClass="textarea"
                                rows={3} maxLength={30} label="Platform Description"
                                placeholder="Enter the platform description" helpMessage="From 4 to 300 characters"
                                errorField={userPlatforms.description_error}
                                component={this.renderInputField}
                            />
                            <FormGroup>
                                <ControlLabel>Interworking Services</ControlLabel>
                                <Row className="interworking-service">
                                    <Col sm={8}>
                                        <Field
                                            name="interworkingServiceUrl" type="text" subElement={true}
                                            placeholder="Enter a valid https url"
                                            errorField={userPlatforms.interworkingServiceUrl_error}
                                            component={this.renderInputField}
                                        />
                                    </Col>
                                    <Col sm={4}>
                                        <Field
                                            name="informationModel" options={this.informationModels()}
                                            placeholder="Information Model" subElement={true}
                                            component={RFReactSelect}
                                        />
                                        <FieldError error={userPlatforms.informationModel_error} />

                                    </Col>
                                </Row>
                            </FormGroup>
                            <Row>
                                <Col sm={6}>
                                    <FormGroup controlId="type">
                                        <ControlLabel>Type</ControlLabel>
                                        <Field
                                            name="type" options={this.platformTypes}
                                            clearable={false} searchable={false}
                                            defaultValue={this.typeDefault}
                                            component={RFReactSelect}
                                        />
                                        <FormControl.Feedback />
                                        <HelpBlock>Select your Platform type</HelpBlock>
                                        <FieldError error={userPlatforms.type_error} />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="submit" bsStyle="info" { ...opts }>Submit</Button>
                            <Button type="button" bsStyle="default" onClick={this.close.bind(this)}>Close</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </Fragment>
        );
    }

}

function validate(values) {
    const errors = {};
    const validationFunctions = {
        // "id" : validateId,
        "name" : validateName,
        "description" : validateDescription,
        "interworkingServiceUrl" : validateInterworkingInterfaceUrl,
        "informationModel" : validateInformationModel
    };

    Object.keys(validationFunctions).forEach(function (key) {
        errors[key] = validationFunctions[key](values[key]);
    });
    return errors;
}

function mapStateToProps(state) {
    return {
        modalState: state.modalState,
        informationModels: state.informationModels,
        userPlatforms: state.userPlatforms,
        platformRegistrationValidity: getPlatformRegistrationValidity(state)
    };
}

export default reduxForm({
    form: 'PlatformRegistrationForm',
    validate
})(
    connect(mapStateToProps, {
        changeModalState, fetchInformationModels: fetchAllInformationModels,
        registerPlatform, dismissAlert, removeErrors
    })(PlatformRegistrationModal)
);