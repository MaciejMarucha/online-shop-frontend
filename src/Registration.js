import React from "react";
import {Link, withRouter} from "react-router-dom";
import {Button, Form} from "react-bootstrap";
import './Registration.css';
import {SERVER_URL} from "./constants";

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            firstName: "",
            lastName: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.register = this.register.bind(this);
    }

    register(event) {
        event.preventDefault();
        const registrationRequest = {
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName
        };

        fetch(SERVER_URL+'/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
            ,
            body: JSON.stringify(registrationRequest)
        })
            .then((response) => response.text())
            .then((data) => {
                this.props.history.push("/");
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    handleChange(event) {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    render() {
        return (
            <div className="registerForm">
                <Form onSubmit={this.register}>
                    <Form.Group>
                        <h1>Register</h1>
                        <Form.Control type="email" placeholder="email" name="email" value={this.state.email} onChange={this.handleChange} required/>
                        <br/>
                        <Form.Control type="password" placeholder="password" name="password" value={this.state.password} onChange={this.handleChange} required/>
                        <br/>
                        <Form.Control type="text" placeholder="firstname" name="firstName" value={this.state.firstName} onChange={this.handleChange} required/>
                        <br/>
                        <Form.Control type="text" placeholder="lastname" name="lastName" value={this.state.lastName} onChange={this.handleChange} required/>
                        <br/>
                        <Button variant="dark" type="submit" block>Register</Button>
                    </Form.Group>
                </Form>
                <Link to="/">Login</Link>
            </div>
        );
    }
}

export default withRouter(Registration);
