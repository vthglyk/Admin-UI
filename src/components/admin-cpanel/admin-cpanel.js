import React, { Fragment } from "react";
import Header from "../user-cpanel/header";
import Main from "./main";

const AdminControlPanel = (props) => {
    return(
        <Fragment>
            <Header history={props.history}/>
            <Main/>
        </Fragment>
    );
};

export default AdminControlPanel;