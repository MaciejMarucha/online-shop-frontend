import React from 'react';
import Login from './Login';
import './App.css';
import {BrowserRouter, Route, Switch, } from "react-router-dom";
import Registration from "./Registration";
import Account from "./Account";

class App extends React.Component {

    render() {
        return (
            <BrowserRouter >
                <div className="App">
                    <div className="section">
                        <Switch>
                            <Route exact path="/">
                                <Login/>
                            </Route>
                            <Route path="/register" component={Registration}/>
                            <Route  path="/account">
                                <Account/>
                            </Route>
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;


