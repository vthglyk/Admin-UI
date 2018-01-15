import React from "react";
import {IMAGE_FOLDER, ADMIN_CPANEL_URL} from "../../configuration";
import SignInModal from "../../containers/sign-in-modal";

const Header = ({ history }) => {
    return (
        <div className="header home">
            <img className="logo" src={`${IMAGE_FOLDER}/logo-1.1.png`} />
            <span className="title">Administration</span>
            {/*<a className="admin button" href="/admin/login">SymbIoTe Admin</a>*/}
            <SignInModal
                history={history}
                redirect_on_success={ADMIN_CPANEL_URL}
                buttonTitle="SymbIoTe Admin"
                buttonClass="admin button"
                buttonBsStyle="primary"
            />
        </div>
    );
};

export default Header;