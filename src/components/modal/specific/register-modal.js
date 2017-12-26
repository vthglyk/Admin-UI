import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { selectUserRole } from '../../../actions/index';
import Select from 'react-select';
import ModalButton from '../generic/modal-button';
import Modal from '../generic/modal';
import ModalHeader from '../generic/modal-header';
import ModalBody from '../generic/modal-body';
import ModalFooter from '../generic/modal-footer';

class RegisterModal extends Component {

    handleChange = selectedOption => {
        this.props.selectUserRole(selectedOption);
    };

    render() {
        const { selectedUserRole } = this.props;

        return(
            <Fragment>
                <Modal id="register-modal">
                    <ModalHeader title="Registration" />
                    <ModalBody id="register-modal-body">
                        <div className="input-group">
                            <span className="input-group-addon"><i className="glyphicon glyphicon-user" /></span>
                            <input type="text" className="form-control" placeholder="Username"/>
                        </div>
                        {/*<div className="alert alert-danger"></div>*/}

                        <div className="input-group">
                            <span className="input-group-addon"><i className="glyphicon glyphicon-lock"/></span>
                            <input type="password" className="form-control" placeholder="Password"/>
                        </div>
                        {/*<div className="alert alert-danger">Invalid Password!</div>*/}

                        <div className="input-group">
                            <span className="input-group-addon"><i className="glyphicon glyphicon-envelope"/></span>
                            <input type="text" className="form-control" placeholder="Email"/>
                        </div>
                        {/*<div className="alert alert-danger">Invalid Email!</div>*/}

                        <div className="input-group" id="user-role-input-group">
                            <Select
                                name="user-role-selector"
                                value={selectedUserRole.value}
                                onChange={this.handleChange}
                                options={[
                                    { value: 'one', label: 'One' },
                                    { value: 'two', label: 'Two' },
                                ]}
                            />
                        </div>
                        {/*<div className="alert alert-danger">Invalid Email!</div>*/}

                    </ModalBody>
                    <ModalFooter>
                        <div className="col-sm-12 controls">
                            <button id="register-btn" name="register-btn"
                                    className="btn btn-primary">Register</button>
                        </div>
                    </ModalFooter>
                </Modal>
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return { selectedUserRole: state.selectedUserRole };
}

export default connect(mapStateToProps, { selectUserRole })(RegisterModal);