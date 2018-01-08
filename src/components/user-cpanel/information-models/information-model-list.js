import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import CollapsibleInformationModelPanel from './collapsible-information-model-panel';
import { AlertDismissable } from '../../../helpers/errors';
import {
    deleteInfoModel,
    dismissInfoModelDeletionSuccessAlert, dismissInfoModelDeletionErrorAlert
} from '../../../actions/index';

class InformationModelList extends Component {

    render() {
        const { availableInfoModels, successfulInfoModelDeletion, infoModelDeletionError } = this.props.informationModels;
        console.log(availableInfoModels)
        return(
            <Fragment>
                <AlertDismissable style="danger" message={infoModelDeletionError}
                                  dismissHandler={this.props.dismissInfoModelDeletionErrorAlert} />
                <AlertDismissable style="success" message={successfulInfoModelDeletion}
                                  dismissHandler={this.props.dismissInfoModelDeletionSuccessAlert} />
                {_.map(availableInfoModels, (infoModel) => {
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
    deleteInfoModel,
    dismissInfoModelDeletionSuccessAlert,
    dismissInfoModelDeletionErrorAlert
})(InformationModelList);