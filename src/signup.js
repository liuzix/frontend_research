import React from "react";
import ReactDOM from "react-dom";
import styles from "./signup.css"

export default class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: null,
            isError: false,
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

        
        this.setState(newState);
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
                        <button type="submit">Sign Up</button>
                    </div>
                </form>

            </div>
        );
    }
}

