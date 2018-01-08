import React, { Component } from 'react';
import { Panel, Glyphicon, FormGroup, FormControl, ControlLabel, Button, Row, Col, Modal } from 'react-bootstrap';

export default class CollapsibleInformationModelPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open : false,
            infoModel : props.infoModel,
            deleteModalOpen : false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.infoModel !== this.state.infoModel)
            this.setState({
                open : this.state.open,
                infoModel : props.infoModel,
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

    handleDeleteInfoModel() {
        this.props.onDelete(this.state.infoModel.id);
        this.closeDeleteModal();
    }

    renderInputField(value, label, type) {
        return (
            <FormGroup>
                {label ? <ControlLabel>{label}</ControlLabel> : ""}
                <FormControl
                    type={type} value={value} disabled={true} />
            </FormGroup>
        );
    }

    render() {
        const { infoModel } = this.state;

        return(
            <Panel id="id" bsStyle="primary" className="platform-panel-entry"
                   expanded={this.state.open} onToggle={() => {}}>
                <Panel.Heading onClick={this.togglePanel}>
                    <Panel.Title componentClass="h3">
                        {infoModel.name}
                    </Panel.Title>
                    <Glyphicon glyph={this.state.open ? "minus" : "plus"} className="pull-right" />
                </Panel.Heading>
                <Panel.Collapse>
                    <Panel.Body>
                        <Row>
                            <Col sm={6}>
                                {this.renderInputField(infoModel.name, "Name", "text")}
                            </Col>
                            <Col sm={6}>
                                {this.renderInputField(infoModel.id, "Id", "text")}
                            </Col>
                        </Row>
                    </Panel.Body>
                </Panel.Collapse>
                <Panel.Footer>
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
                            <Modal.Title>Are you sure you want to delete the information model
                                <strong> {infoModel.name}</strong>?</Modal.Title>
                        </Modal.Header>
                            <Modal.Footer>
                                <Button type="button" bsStyle="danger"
                                        onClick={this.handleDeleteInfoModel.bind(this)}>Verify Deletion</Button>
                                <Button type="button" bsStyle="default"
                                        onClick={this.closeDeleteModal.bind(this)}>Close</Button>
                            </Modal.Footer>
                    </Modal>
                </Panel.Footer>
            </Panel>
        );
    }
}