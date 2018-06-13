import React from "react";
import ReactDOM from "react-dom";
import {
    HashRouter,
    Route,
    NavLink,
    Redirect
  } from 'react-router-dom'

import styles from "./index.css"
import Signup from "./signup.js"
import Login from "./login.js"
import Home from "./home.js"

import cookie from "react-cookies"

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
        };
    }

    componentDidMount() {
        this.updateUsername();

    }

    async updateUsername() {
        const url = "/api/login/check";
        try {
            let res = await fetch(url, {
                method: 'GET', 
                credentials: 'include',
            });
            let data = await res.json();
            if (data.username) {
                this.setState({
                    username: data.username,
                });
            } else {
                this.setState({
                    username: null,
                });
            }
        } catch (err) {
            console.error("Error getting login status: " + err);
        }
    }

    logout(e) {
        e.preventDefault();
        cookie.remove("session");
        this.setState({
            username: null,
        });
        setTimeout(() => {
            window.location.href = "/#/login";
        }, 1000);
    }

    renderIfNotLoggedIn(exp) {
        if (!this.state.username) return exp;
        else return null;
    }

    renderIfLoggedIn(exp) {
        if (this.state.username) return exp;
        else return null;
    }


    render() {
        
        return (
            <HashRouter>
                <div className={styles.top_layout}>
                    <nav className={styles.navbar}>
                        {this.renderIfLoggedIn(
                            <div className={styles.welcome}>
                                Welcome, {this.state.username}!
                            </div>
                        )}
                
                        {this.renderIfLoggedIn((
                            <NavLink activeClassName={styles.selected} exact to="/">Home</NavLink>
                        ))}

                        {this.renderIfNotLoggedIn((
                            <NavLink activeClassName={styles.selected} to="/login">Login</NavLink>
                        ))}
                        {this.renderIfNotLoggedIn((
                            <NavLink activeClassName={styles.selected} to="/signup">Sign-up</NavLink>
                        ))}

                        {this.renderIfLoggedIn((
                            <a href="#" onClick={this.logout.bind(this)}>Logout</a>
                        ))}

                        
                        <NavLink activeClassName={styles.selected} to="/about">About</NavLink>
                    </nav>
                    <Route exact path="/" component={Home}/>
                    <Route path="/login" component={Login}/>
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