import React, { Fragment } from "react";
import Header from "./header";
import UserManagement from "./user-management";
import Footer from "./footer";

const Home = (props) => {
    return (
        <Fragment>
            <Header history={props.history} />
            <UserManagement history={props.history} />
            <Footer />
        </Fragment>
    );
};

export default Home;
