import React, { Component } from 'react'
import CreatePin from './CreatePin'
import { Map, Marker, Popup, TileLayer } from "react-leaflet"

class AppMap extends Component {

    state = {
        lat: 39.77,
        lng: -104.97,
        zoom: 13,
        markers: [],
        pins: [],
        markersReady: false,
    }

    addMarker = (e) => {
        console.log(e)
        const { markers } = this.state
        markers.push(e.latlng)
        this.setState({ markers })
        console.log(markers)
    }
    addPin = async (idx, e, data) => {
        const target = this.state.markers[idx]
        // console.log(target)
        // console.log(data.coordinates)
        data.coordinates = `${target.lat} ${target.lng}`
        console.log(idx, data)
        try {
            const createdPinResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/pins/`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            const parsedResponse = await createdPinResponse.json();
            // this.setState({

            //     pins: [...this.state.pins, parsedResponse.data],
            // })
            this.props.history.push('/')
            this.props.history.push('/map')
        }catch (err) {
            console.log('error: ', err)
        }
    }

    getPins = async () => {
        try {
            let temp;
            const pins = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/pins/`, { credentials: 'include' });
            await pins.json().then((val)=>{
                temp = val.data.map(pin=>{
                 let latlng = pin.coordinates
                 let splitLatLng = latlng.split(' ');
                //  console.log(splitLatLng[0])
                //  console.log(splitLatLng[1])
                pin.latlng = {
                    lat: splitLatLng[0],
                    lng: splitLatLng[1]
                }
                return pin;
                })
                console.log(temp)
                this.setState({
                pins: temp,
                markersReady: true, 
                markers: []   
            })     
        console.log(this.state.pins)
            });
        
        } catch (err) {
            console.log(err);
        }
    }

    componentDidMount() {
        this.getPins();
    }

    deletePin = async (id) => {
        console.log(id)
        const deletePinResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/pins/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        }).then(() => {
            this.setState({
                pins: this.state.pins.filter((pin) => pin.id !== id)
            })
            this.props.history.push('/')
            this.props.history.push('/map')
        })
    }
    
    render() {
        // console.log(this.state.markers)
        const position = [this.state.lat, this.state.lng]

        return (
            <Map
                center={position}
                id="map"
                onClick={this.addMarker}
                zoom={this.state.zoom}
            >
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {  this.state.markers.map((position, idx) =>
                    <Marker key={`marker-${idx}`} position={position}>
                        <Popup>
                            <CreatePin 
                            submit={false}
                            addPin={this.addPin.bind(null, idx)}/>
                        </Popup>
                    </Marker>
                 ) }
                {  this.state.markersReady ? this.state.pins.map((position, idx) =>
                    <Marker key={`marker-${idx}`} position={position.latlng}  >
                        <Popup>
                            <CreatePin 
                                props={this.props}
                                submit={true} 
                                title={position.title} 
                                description={position.description}
                                creatorId={position.creator.id} 
                                id={position.id}
                                deletePin={this.deletePin}
                                loggedInUserName={this.props.loggedInUserName}
                                loggedInUserEmail={this.props.loggedInUserEmail}
                                addPin={this.addPin.bind(null, idx)}/>
                        </Popup>
                    </Marker>
                ) : "loading" }
            </Map>
        )
    }
}

export default AppMap