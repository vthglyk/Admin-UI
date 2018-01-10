import React, { Fragment } from "react";
import PlatformRegistrationModal from "../../modals/specific/platform-registration-modal";
import PlatformList from "./platform-list";

const PlatformDetails = () => {
    return(
        <Fragment>
            <PlatformRegistrationModal />
            <PlatformList />
        </Fragment>
    );
};

export default PlatformDetails;