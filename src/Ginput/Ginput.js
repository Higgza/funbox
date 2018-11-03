import React, {Component} from 'react';
import Geosuggest from 'react-geosuggest';
import './Ginput.css';

/* Redux store */
import {connect} from 'react-redux';
import {addAdress, addMapArray} from "../redux/actions/MapActions/mapActions";

export class Gimput extends Component {

    geoSuggest = (node) => {
        this._geoSuggest = node;
    };

    onAddAdressEnter = (e) => {
        if (e.which == null) {
            if (e.keyCode === 13) {
                this.props.onAddMapArray(this.props.mapInfo);
                this._geoSuggest.clear();
            }
        }

        if (e.which !== 0 && e.charCode !== 0) {
            if(e.which === 13) {
                this.props.onAddMapArray(this.props.mapInfo);
                this._geoSuggest.clear();
            }
        }

    };

    render() {
        return (
            <div>
                <Geosuggest ref={this.geoSuggest}
                            onKeyPress={this.onAddAdressEnter}
                            queryDelay={0}
                            ignoreTab={true}
                            placeholder="Укажите точку маршрута"
                            /*location={new window.google.maps.LatLng(55.159283, 61.381320)}*/
                            location={this.props.location}
                            radius={20} onSuggestSelect={this.props.onaddAdress} />
                <button className={'geobtn'}
                        disabled={this.props.mapInfo === undefined || this.props.mapInfo === ''}
                        onClick={() => {
                            this.props.onAddMapArray(this.props.mapInfo);
                            this._geoSuggest.clear();
                }}>Add for route</button>
            </div>
        );
    }
}

function s(state) {
    return {
        mapInfo: state.googleMap.info,
        /*mapArray: state.googleMap.arr*/
        location: new window.google.maps.LatLng(55.159283, 61.381320),
    }
}

function d(dispatch) {
    return {
        onaddAdress: (label) => dispatch(addAdress(label)),
        onAddMapArray: (label) => dispatch(addMapArray(label))
    }
}

export default connect(s, d)(Gimput);