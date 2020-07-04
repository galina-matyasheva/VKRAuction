import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./Components/Header";

class App extends Component {

    render() {
        return (
            <div>
                <Header/>
                <div className='sign-content'>
                </div>
            </div>
        );
    }
}

export default App;
