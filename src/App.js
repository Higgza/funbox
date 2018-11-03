import React, {Component} from 'react';
import './App.css';
import Gimput from "./Ginput/Ginput";
import Gmap from "./Gmap/Gmap";
import DragAndDrop from './DragAndDrop/DragAndDrop';

class App extends Component {

    render() {

        return (
            <div className="App">
                <Gmap />
                <Gimput />
                <DragAndDrop />
            </div>
        );
    }
}

export default App;
