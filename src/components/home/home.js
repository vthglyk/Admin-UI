import React, { Fragment } from 'react';
import Header from './header';
import UserManagement from './UserManagement';
import Footer from './Footer';

const Home = () => {
    return (
        <div>
            <Header />
            <UserManagement />
            <Footer />
        </div>
    );
};

export default Home;
