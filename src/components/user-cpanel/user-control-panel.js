import React, { Fragment } from "react";
import Header from "../../containers/cpanel-header";
import Main from "./main";

const UserControlPanel = (props) => {
    return(
        <Fragment>
            <Header history={props.history}/>
            <Main/>
        </Fragment>
    );
};

export default UserControlPanel;