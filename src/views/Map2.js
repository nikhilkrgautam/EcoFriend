/* global google */
import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer } from "react-google-maps";
import { SearchBox } from "react-google-maps/lib/components/places/SearchBox"
import Marker from "./Marker";

const Map2 = withScriptjs(withGoogleMap((props) =>{


  return (
    <div>
      <div id="route-links" style={{marginTop: "80px"}}>
      {


        /*props.directions.routes.map((route, ind) => {
          return (
            <div key={ind} onMouseEnter={() => props.getRoute(ind)}>
              <h1>Route {ind}</h1>
            </div>
          )
        })*/
        props.directions &&
        props.directions.routes.concat(props.busDirections.routes).concat(props.carDirections.routes).map((route, ind) => {
            console.log(props.emission)
            return (
              <div key={ind} onMouseEnter={() => props.getRoute(ind)}>
                <h1>{route.emissionType} Route {ind} {props.emission[ind] ? (<span>CO2: {props.emission[ind]}</span>) : null}</h1>
              </div>
            )
        })

      }
      </div>
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
        placeholder="Customized your placeholder"
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
        placeholder="Customized your placeholder"
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
      props.directions.routes.map((route, ind) =>
        <DirectionsRenderer directions={props.directions} routeIndex={ind} />
      )

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
    {!props.directions ? props.depMarkers.map((marker, index) =>
      <Marker key={index} position={marker.position} draggable={true} />
    ) : null}
    {!props.directions ? props.arrMarkers.map((marker, index) =>
      <Marker key={index} position={marker.position} draggable={true} />
    ) : null}
      </GoogleMap>
      </div>
    );
  }
))

export default Map2;
