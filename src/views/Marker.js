/* global google */
import React from "react";
import { Marker } from "react-google-maps";

export default class MarkerComp extends React.Component {

  render() {

    const locIcon = { url: require('../icons/location.png'), scaledSize: { width: 60, height: 60 } };

    return(
        <Marker
          position={this.props.position}
          icon={locIcon}
        >
        </Marker>
    );
  }
}
