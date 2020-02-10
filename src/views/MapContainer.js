/* global google */
import React from "react";
import Map from "./Map";
import url from "../google_maps_key"

const google = window.google;

export default class MapContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      directions: null,
      distance: 0,
      co2: 0
    }
  }

  componentDidUpdate() {

  }

  componentDidMount() {
    // this.getDirections()
    // const DirectionsService = new google.maps.DirectionsService();
    //
    //   DirectionsService.route({
    //     origin: new google.maps.LatLng(19.07283, 72.88261),
    //     destination: new google.maps.LatLng(19.08356, 72.88265),
    //     travelMode: google.maps.TravelMode.DRIVING,
    //   }, (result, status) => {
    //     if (status === google.maps.DirectionsStatus.OK) {
    //       console.log(result)
    //       this.setState({
    //         directions: result,
    //       });
    //     } else {
    //       console.error(`error fetching directions ${result}`);
    //     }
    //   });

  }

  getDirections = () => {
      const DirectionsService = new google.maps.DirectionsService();

        DirectionsService.route({
          origin: new google.maps.LatLng(19.07583, 72.88261),
          destination: new google.maps.LatLng(19.08356, 72.88765),
          travelMode: google.maps.TravelMode.DRIVING,
        }, (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            // result.routes[0].legs.forEach((item, i) => {
            //   console.log(item.distance.value)
            // });

            let totalDistance = result.routes[0].legs[0].distance.value;
            totalDistance = totalDistance/1000
            let co2value = this.getCO2Value(totalDistance)


            this.setState({
              directions: result,
              distance: totalDistance,
              co2: co2value
            });
          } else {
            console.error(`error fetching directions ${result}`);
          }
        });

  }

  getCO2Value = (totalDistance) => {
    var url = 'https://cors-anywhere.herokuapp.com/https://api.carbonkit.net/3.6/categories/US_road_transport_by_Greenhouse_Gas_Protocol/calculation?type=passenger+car&fuel=gasoline&emissionStandard=2005-present&uid=2E35U429HR99&values.distance=' + totalDistance;
    var xhr = new XMLHttpRequest();

    xhr.open("GET", url, false);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Authorization", "Basic c2FoaWxuYXJlNzg6I2Zkc2VIc3hla3JlOjM0NQ==");
    //xhr.setRequestHeader("Host", "api.carbonkit.net");
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");

    let co2value = 0;

    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        // innerText does not let the attacker inject HTML elements.
        var resp = JSON.parse(xhr.responseText);
        //alert(resp)

        co2value = resp.output.amounts[1].value
      }
    }
    xhr.send();

    return co2value
  }

	render() {
		return (
      <div>
			<Map
				doctors={this.props.doctors}
        directions={this.state.directions}
        path={this.props.path}
				googleMapURL={url}
				loadingElement={<div style={{ height: `100%` }} />}
				containerElement={<div style={{ height: `600px`, width: `1000px` }} />}
				mapElement={<div style={{ height: `100%` }} />}
			/>
      <button onClick={this.getDirections}>Get directions</button>
      <h1>distance: {this.state.distance} km</h1>
      <h1>co2: {this.state.co2} kg</h1>
      </div>
		);
	}
}

MapContainer.defaultProps = {
  path: [
    {lat: 19.07283, lng: 72.86761},
    {lat: 58.10346, lng: 10.69265}
  ],
  doctors: [
    {
      uid: 1,
      closestPractice: {
        lat: 19.07283,
        lon: 72.88261
      }
    },
    {
      uid: 2,
      closestPractice: {
        lat: 19.08356,
        lon: 72.88265
      }
    }
  ]
}
