/**
 * Компонент вывода карты Google
 */
import React from 'react';
import PropTypes from 'prop-types';
import {withGoogleMap, GoogleMap} from 'react-google-maps';
import styles from './MapBox.scss';

class MapBox extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {error: false};
  }

  componentDidCatch(error, info) {
    this.setState({error, info});
  }

  render() {
    if (this.state.info && this.state.info.componentStack) {
      console.log(this.state.info.componentStack);
    }

    if (this.state.error) {
      return <h2>Error: {this.state.error.toString()}</h2>;
    } else {
      const {
        lat, lng
      } = this.props;

      const GoogleMapArea = withGoogleMap(() => (
        <GoogleMap
          defaultCenter={{lat: lat, lng: lng}}
          defaultZoom={10}
        />
      ));

      const MAP_STYLE = {
        width: '500px',
        height: '500px'
      };

      return (
        <div className={styles['map-box']}>
          <GoogleMapArea
            containerElement={<div style={MAP_STYLE}/>}
            mapElement={<div style={{height: '100%'}}/>}
          />
        </div>
      );
    }
  }
}

MapBox.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
};

export default MapBox;