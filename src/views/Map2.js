/* global google */
import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer } from "react-google-maps";
import { SearchBox } from "react-google-maps/lib/components/places/SearchBox"
import Marker from "./Marker";
import { Polyline } from "react-google-maps"
const locIcon = { url: require('../icons/location.png'), scaledSize: { width: 60, height: 60 } };

const Map2 = withScriptjs(withGoogleMap((props) =>{

    
  return (
    <React.Fragment>
      <div id="route-links" >
        <h1>Available routes: </h1>

        <table className="rwd-table">
          <tr className="rwd-head">
            <th>Source</th>
            <th>Destination</th>
            <th>Time</th>
            <th>Mode of transport</th>
            <th>Carbon Footprint</th>
          </tr>
          {
            
            props.directions &&
            props.directions.routes.concat(props.busDirections.routes).concat(props.carDirections.routes).map((route, ind) => {
                
                
                let time = route.legs[0].duration.text
                let souRce = route.legs[0].start_address.split(" ")
                let source = souRce.slice(souRce.length-4, souRce.length-2).join(" ")
                let desTination = route.legs[0].end_address.split(" ")
                let destination = desTination.slice(desTination.length-4, desTination.length-2).join(" ")
                return (
                  <tr className={Math.round(props.emission[ind]) === Math.round(Math.min(...props.emission)) ? "maxim" : "minim"} key={ind} onMouseEnter={() => props.getRoute(ind)}>
                    <td data-th="Source">{source}</td>
                    <td data-th="Destination">{destination}</td>
                    <td data-th="Time">{time}</td>
                    <td data-th="Mode of Transport">{route.emissionType}</td>
                    <td data-th="Carbon Footprint">{props.emission[ind] ? (<span>{Math.round(props.emission[ind])} kg</span>) : null}</td>
                  </tr>
                )
            })
          }
        </table>
        
      
      </div>
      <div id="map-hold">
      <GoogleMap
        defaultZoom={13}
        center={props.center}
        ref={props.onMapMounted}
        onIdle={props.onIdle}
        >
        <SearchBox
      ref={props.depOnSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.depOnPlacesChanged}
    >
      <input
        type="text"
        placeholder="Source"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `32px`,
          marginTop: `27px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
        }}
      />
    </SearchBox>
    <SearchBox
      ref={props.arrOnSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP_RIGHT}
      onPlacesChanged={props.arrOnPlacesChanged}
    >
      <input
        type="text"
        placeholder="Destination"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `32px`,
          marginTop: `27px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
        }}
      />
    </SearchBox>
    {

      props.directions &&
      /*props.directions.routes.map((route, ind) =>
        <DirectionsRenderer directions={props.directions} routeIndex={ind} />
      )*/

      (props.routeType == "train" ? <DirectionsRenderer directions={props.directions} routeIndex={props.routeIndex} />
      : (props.routeType == "car" ? <DirectionsRenderer directions={props.carDirections} routeIndex={props.routeIndex-5} /> 
      : (<DirectionsRenderer directions={props.busDirections} routeIndex={props.routeIndex-4} />)))

      /*(
          [props.directions, props.carDirections, props.busDirections].map((dir, ind) => {
          if(props.routeIndex <= 3) {
            return (<DirectionsRenderer directions={props.directions} routeIndex={props.routeIndex} polylineOption={{strokeColor: "green"}} />)
          }
          else if(props.routeIndex > 4) {
            return (<DirectionsRenderer directions={props.busDirections} routeIndex={props.routeIndex-5} />)
          }
          else {
            return (<DirectionsRenderer directions={props.carDirections} routeIndex={props.routeIndex-4} />)
          }
        })


      )*/

    }

    {props.polyPath ? 
    <Polyline
      path={props.polyPath}
      geodesic={true}
      options={{
        strokeColor: "blue",
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
    </Polyline> : null}
    {!props.directions ? props.depMarkers.map((marker, index) =>
      <Marker key={index} position={marker.position} draggable={true} />
    ) : null}
    {!props.directions ? props.arrMarkers.map((marker, index) =>
      <Marker key={index} position={marker.position} draggable={true} />
    ) : null}
      </GoogleMap>
      </div>
      </React.Fragment>
    );
  }
))

export default Map2;
