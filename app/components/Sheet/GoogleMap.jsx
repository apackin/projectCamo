import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import { Gmaps, Marker, InfoWindow, Circle } from 'react-gmaps';
import { getLatLongs } from 'actions/sheet';
import { Button } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from 'css/components/map';

const cx = classNames.bind(styles);

class GoogleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {markersCreated: false, markers: []}
    this.createMarkers = this.createMarkers.bind(this);
  }

  createMarkers(markers) {
    let markersToAdd = markers.map((mrk,i) => {
      return (
        <Marker
          key={i}
          lat={mrk.loc.lat}
          lng={mrk.loc.lng}
          label={String(i+1)}
          title={mrk.name}
          />
      )
    })
    this.setState({markersCreated: true, markers: markersToAdd})
  }


  componentWillMount() {
      if(!this.props.markers) return;
      this.createMarkers(this.props.markers);

  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.markers && nextProps.markers !== this.props.markers) {
      console.log('next', nextProps.markers)
      console.log('this', this.props.markers)
      this.createMarkers(nextProps.markers);
    }
  }

  render() {
    if(this.state.markersCreated) {
      return (
        <Gmaps width={'750px'}
          height={'600px'}
          lat={this.props.markers[0].loc.lat}
          lng={this.props.markers[0].loc.lng}
          zoom={11}
          loadingMessage={'Your map is loading'}
          params={{v: '3.exp'}}
          onMapCreated={this.onMapCreated}
          className={cx('mapPlugIn')}
        >
        {this.state.markers}
      </Gmaps>
    )
    } else {
      return <div>Map Loading</div>
    }
  }
}

export default GoogleMap;
