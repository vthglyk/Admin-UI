import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import CollapsiblePlatformPanel from './collapsible-platform-panel';
import { AlertDismissable } from '../../helpers/errors';
import {
    fetchUserPlatforms, deletePlatform,
    dismissPlatformDeletionSuccessAlert, dismissPlatformDeletionErrorAlert
} from '../../actions';

class PlatformPanelList extends Component {

    componentDidMount() {
        this.props.fetchUserPlatforms();
    }

    render() {
        const { availablePlatforms, successfulPlatformDeletion, platformDeletionError } = this.props.userPlatforms;
        return(
            <Fragment>
                <AlertDismissable style="danger" message={platformDeletionError}
                                  dismissHandler={this.props.dismissPlatformDeletionErrorAlert} />
                <AlertDismissable style="success" message={successfulPlatformDeletion}
                                  dismissHandler={this.props.dismissPlatformDeletionSuccessAlert} />
                {_.map(availablePlatforms, (platform) => {
                    return <CollapsiblePlatformPanel
                        key={platform.id}
                        platformId={platform.id}
                        platform={platform}
                        informationModels={this.props.informationModels}
                        onDelete={this.props.deletePlatform} />
                })}
            </Fragment>
        );
    }
}


function mapStateToProps(state) {
    return {
        userPlatforms: state.userPlatforms,
        informationModels: state.informationModels
    };
}

export default connect(mapStateToProps, {
    fetchUserPlatforms, deletePlatform, dismissPlatformDeletionSuccessAlert, dismissPlatformDeletionErrorAlert
})(PlatformPanelList);