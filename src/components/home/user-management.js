import React from "react";
import SignInModal from "../../containers/sign-in-modal";
import UserRegisterModal from "../../containers/user-registration-modal";
import { IMAGE_FOLDER } from "../../configuration";

const UserManagement = (props) => {
    return (
        <div className="content">
            <div className="wrapper platform">
                <div className="title">User Management</div>
                <div className="icon">
                    <img src={`${IMAGE_FOLDER}/suitcase.png`} />
                </div>
                <div>
                        <SignInModal history={props.history}/>
                        <UserRegisterModal history={props.history}/>
                </div>
            </div>
        </div>

    )
};

export default UserManagement;