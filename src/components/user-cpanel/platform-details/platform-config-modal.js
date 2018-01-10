import React, { Fragment } from "react";
import { Button, Modal } from "react-bootstrap";

const PlatformConfigModal = ({ platform, configModalOpen, closeConfigModal, handleConfigPlatform }) => {

    // This function is used in order to preserve the animation on closing the modal
    const modalContent = () => {
        return(
            platform ?
                <Fragment>
                    <Modal.Header closeButton>
                        <Modal.Title>Platform Configuration</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {platform.id}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="button" bsStyle="info"
                                onClick={handleConfigPlatform}>Get Configuration</Button>
                        <Button type="button" bsStyle="default"
                                onClick={closeConfigModal}>Close</Button>
                    </Modal.Footer>
                </Fragment> :
                null
        );
    };

    return(
        <Modal show={configModalOpen} onHide={closeConfigModal}>
            {modalContent()}
        </Modal>
    );

};

export default PlatformConfigModal;
