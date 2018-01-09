import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Modal, Button, FormGroup, FormControl, ControlLabel, Row, Col, HelpBlock, ProgressBar } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import _ from 'lodash';
import { INFORMATION_MODEL_REGISTRATION_MODAL } from '../../../reducers/modal-reducer';
import { InterworkingService, Platform } from '../../../helpers/object-definitions';
import { getPlatformRegistrationValidity } from '../../../selectors/index';
import ProgressBarWrapper from '../../../helpers/ProgressBarWrapper';
import { FieldError, AlertDismissable } from '../../../helpers/errors';
import { validateName, validateUri } from '../../../components/user-cpanel/validation/information-model-registration-validation';
import { getValidationState } from '../../../components/user-cpanel/validation/helpers';
import {
    changeModalState, registerInfoModel, uploadingInfoModelProgress,
    dismissInfoModelRegistrationSuccessAlert, dismissInfoModelRegistrationErrorAlert
} from '../../../actions';

class InformationModelRegistrationModal extends Component {

    open() {
        this.props.changeModalState(INFORMATION_MODEL_REGISTRATION_MODAL, true);
    }

    close() {
        this.props.changeModalState(INFORMATION_MODEL_REGISTRATION_MODAL, false);
    }


    onSubmit(props) {
        this.props.registerInfoModel(
            props,
            (res) => {
                if (res.status === 201) {
                    this.props.changeModalState(INFORMATION_MODEL_REGISTRATION_MODAL, false);
                    this.props.reset();
                    this.props.uploadingInfoModelProgress(0);
                }

            },
            this.props.uploadingInfoModelProgress
        );
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

    renderFileInput(field) {
        delete field.input.value;

        const { input, subElement, errorField, label, helpMessage,
            meta : { touched, invalid, error } } = field;
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

    waitingComponent = () => {
        return(
            <Row>
                <Col lg={9} md={9} sm={9} xs={9}>
                    <strong>Ongoing validation of the information model</strong>
                </Col>
                <Col lg={3} md={3} sm={3} xs={3}>
                    <ProgressBar bsStyle="info" active now={100} />
                </Col>
            </Row>
        );
    };

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

                <AlertDismissable style="success" message={informationModels.successfulInfoModelRegistration}
                                  dismissHandler={this.props.dismissInfoModelRegistrationSuccessAlert} />

                <Modal show={modalState[INFORMATION_MODEL_REGISTRATION_MODAL]} onHide={this.close.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Information Model Registration</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <Modal.Body>
                            <AlertDismissable style="danger" message={informationModels.infoModelRegistrationError}
                                              dismissHandler={this.props.dismissInfoModelRegistrationErrorAlert} />

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
                                        label="Uri" placeholder="Enter the uri of the model"
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
                                        name="rdf"
                                        label="RDF File"
                                        errorField={informationModels.rdf_error}
                                        component={this.renderFileInput}
                                    />
                                </Col>
                            </Row>

                            <Row>
                                <Col lg={12} md={12} sm={12} xs={12}>
                                    <ProgressBarWrapper
                                        bsStyle="info"
                                        uploadedPerCent={informationModels.uploadedPerCent}
                                        waitingComponent={this.waitingComponent}
                                        completed={informationModels.completed}
                                    />
                                </Col>
                            </Row>
                        </Modal.Body>
                        <Modal.Footer>
                            {/*<Button type="submit" bsStyle="info" { ...opts }>Submit</Button>*/}
                            <Button type="submit" bsStyle="info">Submit</Button>
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
    connect(mapStateToProps, {
        changeModalState, registerInfoModel, uploadingInfoModelProgress,
        dismissInfoModelRegistrationSuccessAlert, dismissInfoModelRegistrationErrorAlert
    })(InformationModelRegistrationModal)
);