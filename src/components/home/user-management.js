import React from 'react';
import ModalButton from '../modal/generic/modal-button';
import SignInModal from '../modal/specific/sign-in-modal'
import UserRegisterModal from '../modal/specific/user-registration-modal'

const UserManagement = () => {
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
                                 target="#register-modal" text="Register" />
                </div>
                <SignInModal />
                <UserRegisterModal />
                {/*<a className="login button" href="/user/login">Sign In</a>*/}
                {/*<a className="register button" href="/register">Register</a>*/}
            </div>
        </div>

    )
};

export default UserManagement;