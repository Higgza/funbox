import React, {Component} from 'react';
import {GoogleMap, withGoogleMap, DirectionsRenderer, Marker} from 'react-google-maps';

import {connect} from "react-redux";
import {asyncChangeOnMap, changeInfo} from "../../redux/actions/MapActions/mapActions";

class Map extends Component {

    state = {
        position: {}
    };

    geocoder = new window.google.maps.Geocoder();
    mapRoutRef = (node) => {
        this._mapRoutRef = node;
    };
    googleMapRef = (node) => {
        this._googleMapRef = node;
    };
    refMarker = (node) => {
        this._refMarker = node;
    };

    cch = () => {
        let qwr = [];
        let newPr = new Promise((res, rej) => {
            this._mapRoutRef.getDirections().geocoded_waypoints.forEach((x) => {
                this.geocoder.geocode({'placeId': x.place_id}, (results, status) => {
                    if (status !== 'OK') {
                        rej(status);
                        window.alert('Ошибка геокодирования: ' + status);
                        return;
                    }
                    qwr.push({name: results[0].formatted_address});
                });
            });
            let timerLoading = setInterval(() => {
                if(qwr.length === this.props.route.length) {
                    clearTimeout(timerLoading);
                    res(qwr);
                }
            }, 50);
        });
        newPr.then(res => {
            this.props.onChangeListArray(res);
        }, error => {
            console.log('------------- ERROR -------------');
            console.log(error);
        });
    };

    markerPoint = (aMarker) => {
        this.geocoder.geocode({'address': aMarker}, (results, status) => {
            if (status !== 'OK') {
                console.log('Ошибка геокодирования markerPoint: ' + status);
                return;
            }
            this.setState({
                position: results[0].geometry.location
            });
            this._googleMapRef.panTo(results[0].geometry.location);
        });
    };

    markerArrayPoint = (address, routeArray) => {
        let ar = routeArray.concat();
        ar[0] = {name: address};
        this.props.onChangeFirstElement(address, routeArray);
    };

    shouldComponentUpdate() {
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
        if(nextProps.route.length === 0) {
            this.markerPoint(nextProps.adressMarker);
        }

        if(this.props.route.length >= 1) {
            this.markerArrayPoint(nextProps.adressMarker, nextProps.route);
        }
    }

    dragEndPositionMarker = () => {
        let arr = this.props.route.concat();
        this.geocoder.geocode({'location': this._refMarker.getPosition()}, (results, status) => {
            if (status !== 'OK') {
                console.log('Ошибка геокодирования dragEndPositionMarker: ' + status);
                return;
            }

            arr[0] = {name: results[0].formatted_address};
            this.props.onChangeFirstElement(results[0].formatted_address, arr);
        });


    };

    render() {
        return (
            <div>
                <GoogleMap
                    ref={this.googleMapRef}
                    defaultZoom={14}
                    defaultCenter={{lat: 55.155941, lng: 61.382343}}>
                    {
                        this.props.directions && this.props.route.length <= 1 ? null : <DirectionsRenderer
                            ref={this.mapRoutRef}
                            onDirectionsChanged={this.cch}
                            options={{draggable: true}}
                            directions={this.props.directions}/>
                    }
                    {this.props.route.length < 2 && this.props.adressMarker !== '' ?
                        <Marker
                            ref={this.refMarker}
                            position={this.state.position}
                            draggable={true}
                            title={'lololol'}
                            onDragEnd={this.dragEndPositionMarker}
                        />
                        : null}
                </GoogleMap>
            </div>
        );
    }
}
function s(state) {
    return {
        route: state.googleMap.arr,
        adressMarker: state.googleMap.info
    }
}
function d(dispatch) {
    return {
        onChangeListArray: (arr) => dispatch(asyncChangeOnMap(arr)),
        onChangeFirstElement: (position, arr) => dispatch(changeInfo(position, arr))
    }
}

export default connect(s, d)(withGoogleMap(Map));