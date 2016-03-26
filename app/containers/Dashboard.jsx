import styles from 'css/components/dashboard';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';
import UserProfile from '../components/Dashboard/UserProfile';
import SpaceList from '../components/Dashboard/SpaceList';
import CollabSpaces from '../components/Dashboard/CollabSpaces';
import Navigation from 'containers/Navigation';
import * as Actions from '../actions/dashboard';
/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */

const cx = classNames.bind(styles);

class Dashboard extends Component {
  constructor(props, context) {
    super(props, context);
    this.createSpace = this.createSpace.bind(this)
  }

  componentWillMount() {
    if (!this.props.spaces) {
      this.props.dispatch(Actions.getSpaces());
    }
  }

  createSpace() {
    this.props.dispatch(Actions.createSpace(this.props.spaces.length+1));
  }

  render() {
    console.log('rendered')
    return (
      <div>
        <Navigation disabled={true} />
        <div className={cx('dashboard')}>
          <UserProfile user={this.props.user} />
          <SpaceList spaces={this.props.spaces} createSpace={this.createSpace}/>
          <CollabSpaces collabSpaces={this.props.collabSpaces} />
      </div>
    </div>
    )
  }
}

function mapStateToProps(state) {
  return {user: state.user, spaces: state.dashboard.spaces, collabSpaces: state.dashboard.collabSpaces};
}

export default connect(mapStateToProps)(Dashboard);
