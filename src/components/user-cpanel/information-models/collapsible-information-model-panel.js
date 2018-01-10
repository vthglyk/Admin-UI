import React, { Component } from "react";
import { Panel, Glyphicon, Button, Modal } from "react-bootstrap";
import InfoModelPanelBody from "./info-model-panel-body";
import InfoModelDeleteModal from "./info-model-delete-modal";

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
                infoModel : nextProps.infoModel,
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
                    <InfoModelPanelBody infoModel={infoModel} />
                </Panel.Collapse>
                <Panel.Footer className="info-model-info-footer">
                    <InfoModelDeleteModal
                        infoModel={infoModel}
                        deleteModalOpen={this.state.deleteModalOpen}
                        openDeleteModal={this.openDeleteModal.bind(this)}
                        closeDeleteModal={this.closeDeleteModal.bind(this)}
                        handleDeleteInfoModel={this.handleDeleteInfoModel.bind(this)} />
                </Panel.Footer>
            </Panel>
        );
    }
}