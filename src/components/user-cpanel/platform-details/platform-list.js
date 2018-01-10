import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import CollapsiblePlatformPanel from "./collapsible-platform-panel";
import PlatformDeleteModal from "./platform-delete-modal";
import { AlertDismissable } from "../../../helpers/errors";
import {
    fetchUserPlatforms, activatePlatformDeleteModal,
    deactivatePlatformDeleteModal, deletePlatform }
    from "../../../actions/platform-actions";
import {
    dismissPlatformDeletionSuccessAlert, dismissPlatformDeletionErrorAlert
} from "../../../actions/dismiss-alerts-actions";

class PlatformPanelList extends Component {

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
            platformIdToDelete ?
                <PlatformDeleteModal
                    platform={availablePlatforms[platformIdToDelete]}
                    deleteModalOpen={!!platformIdToDelete}
                    closeDeleteModal={deactivatePlatformDeleteModal}
                    handleDeletePlatform={handleDeletePlatform} />
                : null
        );
    };

    render() {
        const { availablePlatforms, successfulPlatformDeletion, platformDeletionError } = this.props.userPlatforms;
        const { platformIdToDelete } = this.props.platformDeleteModal;

        return(
            <Fragment>
                <AlertDismissable style="danger" message={platformDeletionError}
                                  dismissHandler={this.props.dismissPlatformDeletionErrorAlert} />
                <AlertDismissable style="success" message={successfulPlatformDeletion}
                                  dismissHandler={this.props.dismissPlatformDeletionSuccessAlert} />
                {_.map(availablePlatforms, (platform) => {
                    return <CollapsiblePlatformPanel
                        key={platform.id}
                        platform={platform}
                        informationModels={this.props.informationModels}
                        openDeleteModal={this.props.activatePlatformDeleteModal} />
                })}

                {
                    this.showPlatformDeleteModal(platformIdToDelete, availablePlatforms,
                        this.props.deactivatePlatformDeleteModal, this.handleDeletePlatform.bind(this))
                }


            </Fragment>
        );
    }
}


function mapStateToProps(state) {
    return {
        userPlatforms: state.userPlatforms,
        informationModels: state.informationModels,
        platformDeleteModal: state.platformDeleteModal
    };
}

export default connect(mapStateToProps, {
    fetchUserPlatforms,
    deletePlatform,
    activatePlatformDeleteModal,
    deactivatePlatformDeleteModal,
    dismissPlatformDeletionSuccessAlert,
    dismissPlatformDeletionErrorAlert
})(PlatformPanelList);