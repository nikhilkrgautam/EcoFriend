/* global google */
import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer } from "react-google-maps";
import Marker from "./Marker";

const Map = withScriptjs(withGoogleMap((props) =>{

  const markers = props.doctors.map( doctor => <Marker
                    key={doctor.uid}
                    doctor={doctor}
                    position={{lat: doctor.closestPractice.lat, lng: doctor.closestPractice.lon}}
                  />);
  return (
      <GoogleMap
        defaultZoom={14}
        center={ { lat:  19.07285, lng: 72.8823 } }
        >
        {props.directions && <DirectionsRenderer directions={props.directions} />}
        {markers}
      </GoogleMap>
    );
  }
))

export default Map;
