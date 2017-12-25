import React from 'react';
import SignInModal from '../modal/specific/sign-in-modal'

const UserManagement = () => {

    return (
        <div className="content">
            <div className="wrapper platform">
                <div className="title">User Management</div>
                <div className="icon">
                    <img src="images/suitcase.png"/>
                </div>
                <SignInModal />

                {/*<a className="login button" href="/user/login">Sign In</a>*/}
                <a className="register button" href="/register">Register</a>
            </div>
        </div>

    )
};

export default UserManagement;