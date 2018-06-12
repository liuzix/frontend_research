import React from "react";
import ReactDOM from "react-dom";
import styles from "./login.css"

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: null,
            isError: false,
            disabled: false,
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
              
        const url = "/api/login";
        const postData = {
            name: data.get("name"),
            psw: data.get("psw"),
        };

        this.setState({
            message: "Sending request",
            isError: false,
            disabled: true,
        });

        fetch(url, {
            method: "POST", 
            body: JSON.stringify(postData), 
            credentials: 'include',
            headers:{
              "Content-Type": "application/json"
            }
        }).then(res => res.json())
        .catch(error => this.setState({
            message: error,
            isError: true,
            disabled: false,
        }))
        .then(response => this.handleResponse(response));
    }

    handleResponse(response) {
        let newState;

        if (response.status === "OK") {
            newState = {
                message: "Login successful!",
                isError: false,
                disabled: true,
            };
        } else {
            newState = {
                message: response.status,
                isError: true,
                disabled: false,
            };
        }

        this.setState(newState);
        
        if (response.status === "OK") {
            setTimeout(() => {
                window.location.href = "/";
            }, 1000);
        }
    }

    render () {
        return (
            <div className={styles.login}>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <div className={styles.login_form}>
                        <label>Name</label>
                        <input type="text" name="name" className={styles.login_form_input} required />
                        <label>Password</label>
                        <input type="password" name="psw" className={styles.login_form_input} required />
                    </div>
                    <div className={`${styles.login_message} ${this.state.isError ? styles.login_error : ''}`} >
                        {this.state.message}
                    </div>
                    <div className={styles.login_form_submit}>
                        <button type="submit" disabled={this.state.disabled} >Login</button>
                    </div>
                </form>
            </div>
        );
    }
}

