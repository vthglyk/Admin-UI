import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import CollapsibleInformationModelPanel from "./collapsible-information-model-panel";
import { AlertDismissable } from "../../../helpers/errors";
import {
    deleteInfoModel
} from "../../../actions/info-model-actions";
import { dismissInfoModelDeletionSuccessAlert, dismissInfoModelDeletionErrorAlert
} from "../../../actions/dismiss-alerts-actions";
import {fetchUserInformationModels} from "../../../actions/info-model-actions";

class InformationModelList extends Component {

    componentDidMount() {
        this.props.fetchUserInformationModels();
    }

    render() {
        const { availableUserInfoModels, successfulInfoModelDeletion, infoModelDeletionError } = this.props.informationModels;
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
                        onDelete={this.props.deleteInfoModel} />
                })}
            </Fragment>
        );
    }
}


function mapStateToProps(state) {
    return {
        informationModels: state.informationModels
    };
}

export default connect(mapStateToProps, {
    fetchUserInformationModels,
    deleteInfoModel,
    dismissInfoModelDeletionSuccessAlert,
    dismissInfoModelDeletionErrorAlert
})(InformationModelList);