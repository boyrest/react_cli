import {BrowserRouter, Route} from 'react-router-dom'
import React, {Component} from 'react';

//import every main component
import LoginPage from './pages/login';

export default class Routes extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route path="/" component={LoginPage}></Route>
                  
                </div>
            </BrowserRouter>
        );
    };
}