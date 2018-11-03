import React, {Component} from 'react';
import Map from "./Map/Map";

import {connect} from "react-redux";
import {cArray} from "../redux/actions/MapActions/mapActions";

class Gmap extends Component {

    state = {
        directions: {}
    };

    startRoute() {
        const DirectionsService = new window.google.maps.DirectionsService();

        let request = {
            origin: this.props.route[0].name,
            destination: this.props.route[this.props.route.length - 1].name,
            travelMode: window.google.maps.TravelMode.DRIVING, // DRIVING, BICYCLING, TRANSIT, WALKING
            provideRouteAlternatives: false,
            waypoints: []
        };

        if (this.props.route.length >= 3) {
            let arrRoute = this.props.route.slice(1, this.props.route.length - 1);

            arrRoute.forEach((x) => {
                request.waypoints = [
                    ...request.waypoints,
                    {location: x.name, stopover: true}
                ];
            });
        }


        DirectionsService.route(request, (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
                this.setState({
                    directions: result,
                });
            } else {
                console.error(`error fetching directions ${result}`);
            }
        });
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        /*if (nextProps.route.length >= 1) {
            return true;
        }*/
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.route.length >= 2) {
            this.startRoute();
        }
    }

    render() {
        return (
            <div id={'map'}>
                <Map directions={this.state.directions}
                     loadingElement={<div style={{height: `100%`}}/>}
                     containerElement={<div style={{height: `400px`}}/>}
                     mapElement={<div style={{height: `100%`}}/>} />
            </div>
        );
    }
}

function s(state) {
    return {
        route: state.googleMap.arr
    }
}

function d(dispatch) {
    return {
        onChangeListArray: (arr) => dispatch(cArray(arr))
    }
}


export default connect(s, d)(Gmap);