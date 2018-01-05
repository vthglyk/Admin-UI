import React, { Component } from 'react';
import { Panel, Glyphicon } from 'react-bootstrap';

export default class CollapsiblePlatformPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open : false,
            platform : props.platform
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps")
        if ( nextProps.platform !== this.state.platform)
            this.setState({
                open : this.state.open,
                platform : nextProps.platform
            });
    }

    togglePanel = (e) => {
        this.setState({
            open : !this.state.open,
            platform : this.state.platform
        });
    };

    render() {
        const { platform } = this.state;

        return(
            <Panel id="id" bsStyle="primary" className="platform-panel-entry"
                   expanded={this.state.open} onToggle={() => {}}>
                <Panel.Heading onClick={this.togglePanel}>
                    <Panel.Title componentClass="h3">
                        {platform.name}
                    </Panel.Title>
                    <Glyphicon glyph={this.state.open ? "minus" : "plus"} className="pull-right"/>
                </Panel.Heading>
                <Panel.Collapse>
                    <Panel.Body>Basic panel example</Panel.Body>
                </Panel.Collapse>
                <Panel.Footer>Panel footer</Panel.Footer>
            </Panel>
        );
    }
}