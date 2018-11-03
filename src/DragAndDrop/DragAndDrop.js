import React, {Component} from 'react';
import './DragAndDrop.css';

import {connect} from 'react-redux';
import {cArray, deleteRouteList} from "../redux/actions/MapActions/mapActions";

export class DragAndDrop extends Component {

    state = {
        memory: {}
    };

    DragEnter = (e) => {
        e.target.style.border = '2px dashed #717dff';
    };

    DragLeave = (obj, i, e) => {
        e.target.style.border = '1px solid #dbdbdb';
        this.setState({
            memory: {
                index: i,
                name: obj.name
            }
        });
    };

    changeRouteArray = (obj, i) => {
        let cloneArray = this.props.ddMapArray.concat();
        cloneArray[this.state.memory.index] = obj;
        cloneArray[i] = this.state.memory;

        this.props.onCArray(cloneArray);
    };

    deleteThisAdress = (i) => {
        let ar = this.props.ddMapArray.concat();
        ar.splice(i, 1);
        this.props.onDeteleArrayRoute(ar);
    };

    render() {
        return (
                <div className={"DragAndDrop"}>
                    {   this.props.ddMapArray.length >= 2 ?
                        <div className={'testClassName1'}>
                            <h2>Построенный Вами маршрут</h2>
                            <ul>
                                {
                                    this.props.ddMapArray.map((x, i) => (
                                        <li key={i}
                                            draggable={true}
                                            onDragEnter={this.DragEnter}
                                            onDragLeave={this.DragLeave.bind(this, x, i)}
                                            onDragEnd={this.changeRouteArray.bind(this, x, i)}
                                        >{x.name} <i className="material-icons"
                                                     onClick={this.deleteThisAdress.bind(this, i)}
                                        >delete_forever</i></li>
                                    ))
                                }
                            </ul>
                        </div>
                        : null
                    }
                    { this.props.ddMapArray.length === 1 ?
                            <div className={'testClassName2'}>
                                <h2>Добавте минимум 2 точки маршрута</h2>
                                <ul>
                                    <li>{this.props.ddMapArray[0].name} <i className="material-icons" onClick={this.deleteThisAdress.bind(this, 0)}
                                    >delete_forever</i></li>
                                </ul>
                            </div>
                        : null
                    }
                </div>
        );
    }
}

function s(state) {
    return {
        ddMapArray: state.googleMap.arr
    }
}

function d(dispatch) {
    return {
        onCArray: (obj) => dispatch(cArray(obj)),
        onDeteleArrayRoute: (obj) => dispatch(deleteRouteList(obj))
    }
}

export default connect(s, d)(DragAndDrop);