import React, { Fragment } from 'react';
import { Button, Modal } from 'react-bootstrap';

const PlatformDeleteModal = ({ platform, deleteModalOpen, openDeleteModal, closeDeleteModal, handleDeletePlatform }) => {
    return(
        <Fragment>
            <Button
                className="btn-warning-delete"
                bsStyle="warning"
                onClick={openDeleteModal}>
                Delete
            </Button>
            <Modal show={deleteModalOpen} onHide={closeDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to delete the platform
                        <strong> {platform.name}</strong>?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4 className="text-danger">Warning - if you delete this platform, some information may be lost!</h4>
                    <p>(During release 1.1.0, make sure you have deleted all registered resources)</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="button" bsStyle="danger"
                            onClick={handleDeletePlatform}>Verify Deletion</Button>
                    <Button type="button" bsStyle="default"
                            onClick={closeDeleteModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
};

export default PlatformDeleteModal;