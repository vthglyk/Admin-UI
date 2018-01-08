import React, { Component } from 'react';
import Select from 'react-select';
import { Panel, Glyphicon, FormGroup, FormControl, ControlLabel, Button, Row, Col, Modal } from 'react-bootstrap';

export default class CollapsiblePlatformPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open : false,
            platform : props.platform,
            informationModels : props.informationModels,
            deleteModalOpen : false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.platform !== this.state.platform ||
            nextProps.informationModels !== this.state.informationModels)
            this.setState({
                open : this.state.open,
                platform : nextProps.platform,
                informationModels : nextProps.informationModels,
                deleteModalOpen : this.state.deleteModalOpen
            });
    }

    togglePanel = (e) => {
        this.setState({...this.state, open : !this.state.open});
    };

    openDeleteModal() {
        this.setState({...this.state, deleteModalOpen : true});
    }

    closeDeleteModal() {
        this.setState({...this.state, deleteModalOpen : false});
    }

    handleDeletePlatform() {
        this.props.onDelete(this.state.platform.id);
        this.closeDeleteModal();
    }

    renderInputField(value, label, type, componentClass, rows) {
        return (
            <FormGroup>
                {label ? <ControlLabel>{label}</ControlLabel> : ""}
                <FormControl
                    componentClass={componentClass} rows={rows}
                    type={type} value={value} disabled={true} />
            </FormGroup>
        );
    }

    render() {
        const { platform, informationModels : {availableInfoModels} } = this.state;
        const informationModelId = platform.interworkingServices[0].informationModelId;
        const informationModelOptions = [{
            label : availableInfoModels[informationModelId].name,
            value : availableInfoModels}];
        const platformOptions = [{
            label : platform.isEnabler ? "Enabler" : "Platform",
            value : platform.isEnabler ? "true" : "false"}];

        return(
            <Panel id="id" bsStyle="primary" className="platform-panel-entry"
                   expanded={this.state.open} onToggle={() => {}}>
                <Panel.Heading onClick={this.togglePanel}>
                    <Panel.Title componentClass="h3">
                        {platform.name}
                    </Panel.Title>
                    <Glyphicon glyph={this.state.open ? "minus" : "plus"} className="pull-right" />
                </Panel.Heading>
                <Panel.Collapse>
                    <Panel.Body>
                        <Row>
                            <Col sm={6}>
                                {this.renderInputField(platform.id, "Platform Id", "text", "input", null)}
                            </Col>
                            <Col sm={6}>
                                {this.renderInputField(platform.name, "Platform Name", "text", "input", null)}
                            </Col>
                        </Row>
                        {this.renderInputField(platform.description[0].description, "Platform Description", "text", "textarea", 3)}

                        <FormGroup>
                            <ControlLabel>Interworking Services</ControlLabel>
                            <Row className="interworking-service">
                                <Col sm={8}>
                                    {this.renderInputField(platform.interworkingServices[0].url, null, "text", "input", null)}
                                </Col>
                                <Col sm={4}>
                                    <Select
                                        options={informationModelOptions}
                                        value={informationModelOptions[0].value}
                                        disabled={true} />
                                </Col>
                            </Row>
                        </FormGroup>
                        <Row>
                            <Col sm={4}>
                                <FormGroup>
                                    <ControlLabel>Type</ControlLabel>
                                    <Select
                                        options={platformOptions}
                                        value={platformOptions[0].value}
                                        disabled={true} />
                                </FormGroup>
                            </Col>
                        </Row>
                    </Panel.Body>
                </Panel.Collapse>
                <Panel.Footer className="platform-info-footer">
                    <Button
                        bsStyle="info">
                        Get Configuration
                    </Button>
                    <Button
                        className="btn-warning-delete"
                        bsStyle="warning"
                        onClick={this.openDeleteModal.bind(this)}>
                        Delete
                    </Button>
                    <Modal show={this.state.deleteModalOpen} onHide={this.closeDeleteModal.bind(this)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Are you sure you want to delete the platform
                                <strong> {platform.name}</strong>?</Modal.Title>
                        </Modal.Header>
                            <Modal.Body>
                                <h4 className="text-danger">Warning - if you delete this platform, some information may be lost!</h4>
                                <p>(During release 1.1.0, make sure you have deleted all registered resources)</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button type="button" bsStyle="danger"
                                        onClick={this.handleDeletePlatform.bind(this)}>Verify Deletion</Button>
                                <Button type="button" bsStyle="default"
                                        onClick={this.closeDeleteModal.bind(this)}>Close</Button>
                            </Modal.Footer>
                    </Modal>
                </Panel.Footer>
            </Panel>
        );
    }
}