import React from "react";
import ReactDOM from "react-dom";
import styles from "./signup.css"

export default class Signup extends React.Component {
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
              
        const psw = data.get('psw');
        const psw_repeat = data.get('psw-repeat');

        let newState;

        if (psw != psw_repeat) {
            newState = {
                message: "Passwords don't match",
                isError: true,
            };
        } else {
            newState = {
                message: null, 
                isError: false,
            };
        }

        if (psw.length <= 6) {
            newState = {
                message: "Passwords must be longer than 6 characters",
                isError: true,
            };
        }

        this.setState(newState);

        if (newState.isError) return;

        const url = "/api/signup";
        const postData = {
            name: data.get('name'),
            psw: psw,
            'psw-repeat': psw_repeat,
        };

        this.setState({
            message: "Sending request",
            isError: false,
            disabled: true,
        });

        fetch(url, {
            method: 'POST', 
            body: JSON.stringify(postData), 
            credentials: 'include',
            headers:{
              'Content-Type': 'application/json'
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
                message: "Signup successful!",
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
            <div className={styles.signup}>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <div className={styles.signup_form}>
                        <label>Name</label>
                        <input type="text" name="name" className={styles.signup_form_input} required />
                        <label>Password</label>
                        <input type="password" name="psw" className={styles.signup_form_input} required />
                        <label>Repeat Password</label>
                        <input type="password" name="psw-repeat" className={styles.signup_form_input} required />
                    </div>
                    <div className={`${styles.signup_message} ${this.state.isError ? styles.signup_error : ''}`} >
                        {this.state.message}
                    </div>
                    <div className={styles.signup_form_submit}>
                        <button type="submit" disabled={this.state.disabled} >Sign Up</button>
                    </div>
                </form>
            </div>
        );
    }
}

