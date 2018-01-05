import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import CollapsiblePlatformPanel from './collapsible-platform-panel';
import { fetchUserPlatforms } from "../../actions";

class PlatformPanelList extends Component {

    componentDidMount() {
        this.props.fetchUserPlatforms();
    }

    render() {
        const { availablePlatforms } = this.props.userPlatforms;
        console.log("platformList rendering")
        return(
            <Fragment>
                {_.map(availablePlatforms, (platform) => {
                    return <CollapsiblePlatformPanel platform={platform} key={platform.id}/>
                })}
            </Fragment>
        );
    }
}


function mapStateToProps(state) {
    return {
        userPlatforms: state.userPlatforms
    };
}

export default connect(mapStateToProps, { fetchUserPlatforms })(PlatformPanelList);