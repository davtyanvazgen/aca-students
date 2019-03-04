import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from "./components/authentication/signin";
import Main from "./containers/Main";
import AddStudent from './components/authentication/registrationForm/addRegForm'
import {Provider} from "react-redux";
import createReduxStore from './store/createReduxStore'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { createFirestoreInstance } from 'redux-firestore'
import firebase from "firebase"


const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true
}

const store = createReduxStore();

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance,
}

const App = () => (
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <div>
                <Router>
                    <Switch>
                        <Route
                            path="/registration"
                            component={ AddStudent }
                        />
                        <Route
                            path="/signin"
                            component={SignIn}
                        />
                        <Route
                            path="/"
                            component= { Main }
                        />
                    </Switch>
                </Router>
            </div>
        </ReactReduxFirebaseProvider>
    </Provider>
);


export default App;