import React from 'react';
import { imageFolder } from "../../configuration/conf";

const Header = () => {
    return (
        <div className="header">
            <img className="logo" src={`${imageFolder}/logo-1.1.png`} />
            <span className="title">Administration</span>
            <a className="admin button" href="/admin/login">SymbIoTe Admin</a>
        </div>
    );
};

export default Header;