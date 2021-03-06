import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import { Gmaps, Marker, InfoWindow, Circle } from 'react-gmaps';
import { getLatLongs } from 'actions/sheet';
import { Button } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from 'css/components/map';

const cx = classNames.bind(styles);

const coords = {
  lat: 51.5258541,
  lng: -0.08040660000006028
};

class GoogleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {markersCreated: false, markers: [], zoom: 12, midPoint:[]}
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

    let ranges = markers.reduce((accum, mrk) => {
      if (accum.length === 0) accum = [mrk.loc.lat, mrk.loc.lat, mrk.loc.lng, mrk.loc.lng]
      if (mrk.loc.lat > accum[0]) accum[0] = mrk.loc.lat;
      if (mrk.loc.lat < accum[1]) accum[1] = mrk.loc.lat;
      if (mrk.loc.lng > accum[2]) accum[2] = mrk.loc.lng;
      if (mrk.loc.lng < accum[3]) accum[3] = mrk.loc.lng;
      return accum;
    },[])
    let midPoint = [(ranges[0]+ranges[1])/2,(ranges[2]+ranges[3])/2];
    ranges = [ranges[0]-ranges[1],ranges[2]-ranges[3]];
    let zoom = 21-Math.ceil(Math.log(Math.max(...ranges)/.0005)/Math.log(2))
    if(zoom > 13) zoom--;

    this.setState({markersCreated: true, markers: markersToAdd, midPoint, zoom})
  }



  componentWillMount() {
      if(!this.props.markers) return;
      this.createMarkers(this.props.markers);

  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.markers && nextProps.markers !== this.props.markers) {
      this.createMarkers(nextProps.markers);
    }
  }

  render() {
    if(this.state.markersCreated) {
      return (
        <Gmaps width={'750px'}
          height={'600px'}
          lat={this.state.midPoint[0]}
          lng={this.state.midPoint[1]}
          zoom={this.state.zoom}
          loadingMessage={'Your map is loading'}
          params={{v: '3.exp'}}
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
