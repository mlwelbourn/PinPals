import React from "react"
import Map from './Map'

class MapContainer extends React.Component {
      state = {
        pins: [],
      }



  render() {
    return (
      <Map {...this.props}  />
    )
  }
}


export default MapContainer