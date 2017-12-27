import React from 'react';
import ModalButton from '../modal/generic/modal-button';
import SignInModal from '../modal/specific/sign-in-modal'
import UserRegisterModal from '../modal/specific/user-registration-modal'

const UserManagement = (props) => {
    return (
        <div className="content">
            <div className="wrapper platform">
                <div className="title">User Management</div>
                <div className="icon">
                    <img src="images/suitcase.png"/>
                </div>
                <div>
                    <ModalButton id="sign-in-btn" extraClasses="login button"
                                 target="#sign-in-modal" text="Sign In"/>
                    <ModalButton id="register-btn" extraClasses="register button"
                                 target="#user-registration-modal" text="Register" />
                </div>
                <SignInModal />
                <UserRegisterModal history={props.history}/>
            </div>
        </div>

    )
};

export default UserManagement;