import {BrowserRouter, Route} from 'react-router-dom'
import React, {Component} from 'react';
import LoginPage from './pages/login';

export default class Routes extends Component {
    render() {
        return (
            <BrowserRouter>
                <Route path="/" component={LoginPage}></Route>
            </BrowserRouter>
        );
    };
}