import React from "react";
/* global google */
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapList: ""
    }
  }

  componentDidMount() {
  }

  render() {

    return (
      <div id="home">
          <h2>Home!</h2>
      </div>
    )
  }
}

export default Home
