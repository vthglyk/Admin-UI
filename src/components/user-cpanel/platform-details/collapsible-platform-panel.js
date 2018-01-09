import React, { Component } from 'react';
import { Panel, Glyphicon, Button } from 'react-bootstrap';
import PlatformPanelBody from './platform-panel-body';
import PlatformDeleteModal from './platform-delete-modal';

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

    render() {
        const { platform, informationModels : {availableInfoModels} } = this.state;
        const informationModelId = platform.interworkingServices[0].informationModelId;
        const informationModelOptions = [{
            label : availableInfoModels[informationModelId].name,
            value : informationModelId
        }];
        const platformOptions = [{
            label : platform.isEnabler ? "Enabler" : "Platform",
            value : platform.isEnabler ? "true" : "false"
        }];

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
                    <PlatformPanelBody
                        platform={platform}
                        informationModelOptions={informationModelOptions}
                        platformOptions={platformOptions} />
                </Panel.Collapse>
                <Panel.Footer className="platform-info-footer">
                    <Button
                        bsStyle="info">
                        Get Configuration
                    </Button>
                    <PlatformDeleteModal
                        platform={platform}
                        deleteModalOpen={this.state.deleteModalOpen}
                        openDeleteModal={this.openDeleteModal.bind(this)}
                        closeDeleteModal={this.closeDeleteModal.bind(this)}
                        handleDeletePlatform={this.handleDeletePlatform.bind(this)} />
                </Panel.Footer>
            </Panel>
        );
    }
}