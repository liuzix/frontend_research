import React from "react";
import ReactDOM from "react-dom";
import styles from "./signup.css"

export default class Signup extends React.Component {

    handleSubmit(event) {
        alert('submitted!');
        event.preventDefault();
    }

    render () {
        return (
            <div className={styles.signup}>
                <form onSubmit={this.handleSubmit}>
                
                </form>
            </div>
        );
    }
}

