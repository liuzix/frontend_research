import "babel-polyfill";

import React from "react";
import ReactDOM from "react-dom";
import {
    HashRouter,
    Route,
    NavLink
  } from 'react-router-dom'

import styles from "./index.css"

import Signup from "./signup.js"

class App extends React.Component {
    render() {
        return (
            <HashRouter>
                <div className={styles.top_layout}>
                    <nav className={styles.navbar}>
                        <NavLink activeClassName={styles.selected} to="/signup">Sign-up</NavLink>
                        <NavLink activeClassName={styles.selected} to="/about">About</NavLink>
                    </nav>
                    <Route path="/signup" component={Signup}/>
                    <Route path="/about" component={About}/>
                </div>
            </HashRouter>
        );
    }
}

const About = () => {
    return (
        <div className={styles.app}>
            <h1>Test!</h1>
            <h1>Test!</h1>
            <h1>Test!</h1>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("app"));