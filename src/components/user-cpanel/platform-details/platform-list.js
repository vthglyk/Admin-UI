import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import CollapsiblePlatformPanel from "./collapsible-platform-panel";
import PlatformDeleteModal from "./platform-delete-modal";
import PlatformConfigModal from "./platform-config-modal";
import { AlertDismissable } from "../../../helpers/errors";
import {
    fetchUserPlatforms, deletePlatform,
    activatePlatformDeleteModal, deactivatePlatformDeleteModal,
    activatePlatformConfigModal
} from "../../../actions/platform-actions";
import {
    dismissAlert, DISMISS_PLATFORM_DELETION_SUCCESS_ALERT, DISMISS_PLATFORM_DELETION_ERROR_ALERT
} from "../../../actions/dismiss-alerts-actions";

class PlatformList extends Component {

    componentDidMount() {
        this.props.fetchUserPlatforms();
    }

    handleDeletePlatform = () => {
        this.props.deletePlatform(this.props.platformDeleteModal.platformIdToDelete);
        this.props.deactivatePlatformDeleteModal();
    };

    showPlatformDeleteModal = (platformIdToDelete, availablePlatforms,
                               deactivatePlatformDeleteModal, handleDeletePlatform) => {
        return (
            availablePlatforms ?
                <PlatformDeleteModal
                    platform={availablePlatforms[platformIdToDelete]}
                    deleteModalOpen={!!platformIdToDelete}
                    closeDeleteModal={deactivatePlatformDeleteModal}
                    handleDeletePlatform={handleDeletePlatform} />
                : null
        );
    };

    showPlatformConfigModal = (platformId, availablePlatforms) => {
        return (
            availablePlatforms ?
                <PlatformConfigModal
                    platform={availablePlatforms[platformId]}
                    configModalOpen={!!platformId}/>
                : null
        );
    };

    dismissPlatformDeletionSuccessAlert() {
        this.props.dismissAlert(DISMISS_PLATFORM_DELETION_SUCCESS_ALERT)
    }

    dismissPlatformDeletionErrorAlert() {
        this.props.dismissAlert(DISMISS_PLATFORM_DELETION_ERROR_ALERT)
    }

    render() {
        const { availablePlatforms, successfulPlatformDeletion, platformDeletionError } = this.props.userPlatforms;
        const { platformIdToDelete } = this.props.platformDeleteModal;
        const { platformId } = this.props.platformConfigModal;

        return(
            <Fragment>
                <AlertDismissable style="danger" message={platformDeletionError}
                                  dismissHandler={this.dismissPlatformDeletionErrorAlert.bind(this)} />
                <AlertDismissable style="success" message={successfulPlatformDeletion}
                                  dismissHandler={this.dismissPlatformDeletionSuccessAlert.bind(this)} />
                {_.map(availablePlatforms, (platform) => {
                    return <CollapsiblePlatformPanel
                        key={platform.id}
                        platform={platform}
                        informationModels={this.props.informationModels}
                        openDeleteModal={this.props.activatePlatformDeleteModal}
                        openConfigModal={this.props.activatePlatformConfigModal}/>
                })}

                {
                    this.showPlatformDeleteModal(platformIdToDelete, availablePlatforms,
                        this.props.deactivatePlatformDeleteModal, this.handleDeletePlatform.bind(this))
                }

                {
                    this.showPlatformConfigModal(platformId, availablePlatforms)
                }


            </Fragment>
        );
    }
}


function mapStateToProps(state) {
    return {
        userPlatforms: state.userPlatforms,
        informationModels: state.informationModels,
        platformDeleteModal: state.platformDeleteModal,
        platformConfigModal: state.platformConfigModal
    };
}

export default connect(mapStateToProps, {
    fetchUserPlatforms,
    deletePlatform,
    activatePlatformDeleteModal,
    deactivatePlatformDeleteModal,
    activatePlatformConfigModal,
    dismissAlert
})(PlatformList);