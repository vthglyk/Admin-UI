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
                {/*<Tabs defaultActiveKey={2} id="uncontrolled-tab-example">*/}
                {/*<Tab eventKey={1} title="Tab 1">Tab 1 content</Tab>*/}
                {/*<Tab eventKey={2} title="Tab 2">Tab 2 content</Tab>*/}
                {/*<Tab eventKey={3} title="Tab 3" disabled>Tab 3 content</Tab>*/}
                {/*</Tabs>*/}
                <Tab.Container id="tabbable-menu" defaultActiveKey="user-details">
                    <Row className="clearfix">
                        <Col md={3}>
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
                        <Col md={9}>
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