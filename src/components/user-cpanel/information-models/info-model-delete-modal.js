import React, { Fragment } from "react";
import { Button, Modal } from "react-bootstrap";

const InfoModelDeleteModal = ({ infoModel, deleteModalOpen, openDeleteModal, closeDeleteModal, handleDeleteInfoModel }) => {
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
                    <Modal.Title>Are you sure you want to delete the information model
                        <strong> {infoModel.name}</strong>?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button type="button" bsStyle="danger"
                            onClick={handleDeleteInfoModel}>Verify Deletion</Button>
                    <Button type="button" bsStyle="default"
                            onClick={closeDeleteModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
};

export default InfoModelDeleteModal;