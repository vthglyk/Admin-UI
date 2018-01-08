import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Modal, Button, FormGroup, FormControl, ControlLabel, Row, Col, HelpBlock } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import _ from 'lodash';
import { INFORMATION_MODEL_REGISTRATION_MODAL } from "../../../reducers/modal-reducer";
import { InterworkingService, Platform } from "../../../helpers/object-definitions";
import { getPlatformRegistrationValidity } from "../../../selectors/index";
import { FieldError, AlertDismissable } from '../../../helpers/errors';
import { changeModalState } from "../../../actions";
import { validateName, validateUri } from '../../../components/user-cpanel/validation/information-model-registration-validation';
import { getValidationState } from '../../../components/user-cpanel/validation/helpers';

class InformationModelRegistrationModal extends Component {

    open() {
        this.props.changeModalState(INFORMATION_MODEL_REGISTRATION_MODAL, true);
    }

    close() {
        this.props.changeModalState(INFORMATION_MODEL_REGISTRATION_MODAL, false);
    }


    onSubmit(props) {
        console.log(props)
        // let { id, name, description, interworkingServiceUrl, informationModel, type } = props;
        // let descriptions = [];
        // let interworkingServices = [];
        //
        // if (!id)
        //     id = "";
        //
        // if (!type)
        //     type = this.typeDefault;
        //
        // descriptions.push(description ? description : "");
        //
        // interworkingServices.push(new InterworkingService(interworkingServiceUrl, informationModel));
        //
        // const newPlatform = new Platform(id, name, descriptions, interworkingServices, type);
        //
        // this.props.registerPlatform(newPlatform, (res) => {
        //     if (res.status === 201) {
        //         this.props.changeModalState(INFORMATION_MODEL_REGISTRATION_MODAL, false);
        //         this.props.reset();
        //     }
        //
        // });
    }


    renderInputField(field) {
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
    }

    renderDropzoneInput(field) {
        const { input, type, placeholder, componentClass, rows, subElement, errorField,
            label, helpMessage, maxLength, meta : { touched, invalid, error } } = field;
        const validationState = getValidationState(input.value, touched, invalid);
        return (
            <FormGroup>
                {label ? <ControlLabel>{label}</ControlLabel> : ""}

                <Dropzone
                    name={field.name}
                    onDrop={( filesToUpload, e ) => field.input.onChange(filesToUpload)}
                    multiple={false}
                    className="rdf-file"
                >
                    <div>Try dropping some files here, or click to select files to upload.</div>
                </Dropzone>
                <FormControl.Feedback className={subElement ? "sub-element" : ""}/>
                <HelpBlock>{validationState === "error" ? error : helpMessage}</HelpBlock>
                <FieldError error={errorField} />
            </FormGroup>
        );
    }

    renderFIleInput(field) {
        delete field.input.value;

        const { input, type, placeholder, componentClass, rows, subElement, errorField,
            label, helpMessage, maxLength, meta : { touched, invalid, error } } = field;
        const validationState = getValidationState(input.value, touched, invalid);
        return (
            <FormGroup>
                {label ? <ControlLabel>{label}</ControlLabel> : ""}

                <input {...input} type="file"/>
                <FormControl.Feedback className={subElement ? "sub-element" : ""}/>
                <HelpBlock>{validationState === "error" ? error : helpMessage}</HelpBlock>
                <FieldError error={errorField} />
            </FormGroup>
        );
    }

    render() {
        const { handleSubmit, modalState, informationModels, platformRegistrationValidity } = this.props;
        const opts = { disabled : !platformRegistrationValidity};

        return(
            <Fragment>
                <Button
                    className="registration-btn"
                    bsStyle="info"
                    onClick={this.open.bind(this)}>
                    Register New Information Model
                </Button>

                {/*<AlertDismissable style="success" message={userPlatforms.successfulPlatformRegistration}*/}
                                  {/*dismissHandler={this.props.dismissPlatformRegistrationSuccessAlert} />*/}

                <Modal show={modalState[INFORMATION_MODEL_REGISTRATION_MODAL]} onHide={this.close.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Information Model Registration</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <Modal.Body>
                            {/*<AlertDismissable style="danger" message={userPlatforms.platformRegistrationError}*/}
                                              {/*dismissHandler={this.props.dismissPlatformRegistrationErrorAlert} />*/}
                            {/*<FieldError error={informationModels.error} />*/}

                            <Row>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <Field
                                        name="name" type="text" maxLength={30}
                                        label="Name" placeholder="Enter name of the model"
                                        helpMessage={"From 2 to 30 characters"}
                                        errorField={informationModels.name_error}
                                        component={this.renderInputField}
                                    />
                                </Col>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <Field
                                        name="uri" type="text"
                                        label="Id" placeholder="Enter the uri of the model"
                                        errorField={informationModels.uri_error}
                                        component={this.renderInputField}
                                    />
                                </Col>
                            </Row>
                            {/*<Field*/}
                                 {/*name="file" type="file"*/}
                                 {/*label="Rdf file" helpMessage="Supported format: .ttl, .nt, .rdf, .xml, .n3, .jsonld"*/}
                                 {/*errorField={informationModels.rdf_file_error}*/}
                                 {/*component={this.renderFileField}*/}
                            {/*/>*/}
                            <Row>
                                <Col lg={12} md={12} sm={12} xs={12}>
                                    <Field
                                        name="rdf_file_input"
                                        label="Rdf File"
                                        component={this.renderFIleInput}
                                    />
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
        "name" : validateName,
        "uri" : validateUri
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
        platformRegistrationValidity: getPlatformRegistrationValidity(state)
    };
}

export default reduxForm({
    form: 'InformationModelRegistrationForm',
    validate
})(
    connect(mapStateToProps, {changeModalState})(InformationModelRegistrationModal)
);