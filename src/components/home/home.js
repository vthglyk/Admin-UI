import React, { Fragment } from 'react';
import Header from './header';
import UserManagement from './user-management';
import Footer from './footer';

const Home = () => {
    return (
        <Fragment>
            <Header />
            <UserManagement />
            <Footer />
        </Fragment>
    );
};

export default Home;
