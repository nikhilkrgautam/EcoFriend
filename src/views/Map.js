/* global google */
import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer } from "react-google-maps";
import Marker from "./Marker";
import { Polyline } from "react-google-maps"

const locIcon = { url: require('../icons/location.png'), scaledSize: { width: 60, height: 60 } };

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
          <Polyline
            path={props.path}
            geodesic={true}
            options={{
              strokeColor: "#ff2527",
              strokeOpacity: 0.75,
              strokeWeight: 2,
              icons: [
                  {
                      icon: locIcon,
                      offset: "0",
                      repeat: "20px"
                  }
              ]
          }}
          >

          </Polyline>
        {props.directions && <DirectionsRenderer directions={props.directions} />}
        {markers}
      </GoogleMap>
    );
  }
))

export default Map;
