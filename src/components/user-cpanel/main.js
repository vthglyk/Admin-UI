import React from 'react';
import { Row, Col, Tab, Nav, NavItem } from 'react-bootstrap';
import UserDetails from './user-details';
import ClientDetails from './client-details';
import PlatformDetails from './platform-details';
import InfromationModels from './information-models';

const Main = () => {
    return(
        <div className="main cpanel">
            <div className="container">
                <Tab.Container id="tabbable-menu" defaultActiveKey="user-details">
                    <Row className="clearfix">
                        <Col md={3} lg={3}>
                            <Nav bsStyle="pills" stacked className="sidebar panel-primary shadow">
                                <NavItem eventKey="user-details">
                                    User Details
                                </NavItem>
                                <NavItem eventKey="client-details">
                                    Client Details
                                </NavItem>
                                <NavItem eventKey="platform-details">
                                    Platform Details
                                </NavItem>
                                <NavItem eventKey="information-models">
                                    Information Models
                                </NavItem>
                            </Nav>
                        </Col>
                        <Col md={9} lg={9}>
                            <Tab.Content animation className="clearfix">
                                <Tab.Pane eventKey="user-details">
                                    <UserDetails />
                                </Tab.Pane>
                                <Tab.Pane eventKey="client-details">
                                    <ClientDetails/>
                                </Tab.Pane>
                                <Tab.Pane eventKey="platform-details">
                                    <PlatformDetails/>
                                </Tab.Pane>
                                <Tab.Pane eventKey="information-models">
                                    <InfromationModels/>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        </div>
    )
};

export default Main;