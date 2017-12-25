import React from 'react';

const UserManagement = () => {

    return (
        <div className="content">
            <div className="wrapper platform">
                <div className="title">User Management</div>
                <div className="icon">
                    <img src="images/suitcase.png"/>
                </div>
                <a className="login button" href="/user/login">Sign In</a>
                <a className="register button" href="/register">Register</a>
            </div>
        </div>

    )
};

export default UserManagement;