import React, { Fragment } from 'react';
import InformationModelRegistrationModal from '../../modals/specific/information-model-registration-modal'
import InformationModelList from './information-model-list';

const InformationModels = () => {
    return(
        <Fragment>
            <InformationModelRegistrationModal />
            <InformationModelList />
        </Fragment>
    );
};

export default InformationModels;