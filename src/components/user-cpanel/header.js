import React from 'react';
import { ButtonGroup, Button, DropdownButton, MenuItem } from 'react-bootstrap';
import { imageFolder } from "../../configuration";

const Header = () => {
    return(
        <div className="header shadow cpanel">
            <div className="container">
                <img className="logo" src={`${imageFolder}/logo-1.1.png`} />
                <span className="title">User Dashboard</span>

                <ButtonGroup className="logout">
                    <DropdownButton title="Username" id="user-dropdown-list">
                        <MenuItem eventKey="1" disabled>Account Details</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey="2">Sign Out</MenuItem>
                    </DropdownButton>
                </ButtonGroup>
            </div>
        </div>
    )
};

export default Header;