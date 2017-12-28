import React from 'react';
import SignInModal from '../modal/specific/sign-in-modal'
import UserRegisterModal from '../modal/specific/user-registration-modal'
import { imageFolder } from '../../configuration';

const UserManagement = (props) => {
    return (
        <div className="content">
            <div className="wrapper platform">
                <div className="title">User Management</div>
                <div className="icon">
                    <img src={`${imageFolder}/suitcase.png`} />
                </div>
                <div>
                    <SignInModal />
                    <UserRegisterModal history={props.history}/>
                </div>
            </div>
        </div>

    )
};

export default UserManagement;