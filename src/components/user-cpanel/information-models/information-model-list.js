import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import CollapsibleInformationModelPanel from "./collapsible-information-model-panel";
import InfoModelDeleteModal from "./info-model-delete-modal";
import { AlertDismissable } from "../../../helpers/errors";
import {
    fetchUserInformationModels, deleteInfoModel,
    activateInfoModelDeleteModal, deactivateInfoModelDeleteModal
} from "../../../actions/info-model-actions";
import { dismissInfoModelDeletionSuccessAlert, dismissInfoModelDeletionErrorAlert
} from "../../../actions/dismiss-alerts-actions";

class InformationModelList extends Component {

    componentDidMount() {
        this.props.fetchUserInformationModels();
    }

    handleDeleteInfoModel= () => {
        this.props.deleteInfoModel(this.props.infoModelDeleteModal.infoModelIdToDelete);
        this.props.deactivateInfoModelDeleteModal();
    };

    showInfoModelDeleteModal = (infoModelIdToDelete, availableUserInfoModels,
                                deactivateInfoModelDeleteModal, handleDeleteInfoModel) => {
        return (
            availableUserInfoModels ?
                <InfoModelDeleteModal
                    infoModel={availableUserInfoModels[infoModelIdToDelete]}
                    deleteModalOpen={!!infoModelIdToDelete}
                    closeDeleteModal={deactivateInfoModelDeleteModal}
                    handleDeleteInfoModel={handleDeleteInfoModel} />
                : null
        );
    };

    render() {
        const { availableUserInfoModels, successfulInfoModelDeletion, infoModelDeletionError } = this.props.informationModels;
        const { infoModelIdToDelete } = this.props.infoModelDeleteModal;

        return(
            <Fragment>
                <AlertDismissable style="danger" message={infoModelDeletionError}
                                  dismissHandler={this.props.dismissInfoModelDeletionErrorAlert} />
                <AlertDismissable style="success" message={successfulInfoModelDeletion}
                                  dismissHandler={this.props.dismissInfoModelDeletionSuccessAlert} />
                {_.map(availableUserInfoModels, (infoModel) => {
                    return <CollapsibleInformationModelPanel
                        key={infoModel.id}
                        infoModel={infoModel}
                        openDeleteModal={this.props.activateInfoModelDeleteModal} />
                })}

                {
                    this.showInfoModelDeleteModal(infoModelIdToDelete, availableUserInfoModels,
                        this.props.deactivateInfoModelDeleteModal, this.handleDeleteInfoModel.bind(this))
                }
            </Fragment>
        );
    }
}


function mapStateToProps(state) {
    return {
        informationModels: state.informationModels,
        infoModelDeleteModal: state.infoModelDeleteModal
    };
}

export default connect(mapStateToProps, {
    fetchUserInformationModels,
    deleteInfoModel,
    dismissInfoModelDeletionSuccessAlert,
    dismissInfoModelDeletionErrorAlert,
    activateInfoModelDeleteModal,
    deactivateInfoModelDeleteModal
})(InformationModelList);