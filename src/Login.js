import {Button, Form} from "react-bootstrap";
import React from "react";
import './Login.css';
import {Link, withRouter} from "react-router-dom";
import {SERVER_URL} from "./constants";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    };

    handleChange(event) {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    handleSubmit(event) {
        event.preventDefault();
        const loginRequest = {
            email: this.state.email,
            password: this.state.password
        };


        fetch(SERVER_URL+"/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginRequest)
        })
            .then((res) => {
                if(res.status === 200){
                    res.json().then(
                        res=> {
                            localStorage.setItem("pin", res.pin);
                            this.props.history.push("/account");
                        }
                    )
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    render() {
        return (
            <div className="loginForm">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <h1>Login</h1>
                        <Form.Control type="email" placeholder="email" value={this.state.email} name="email"
                                      onChange={this.handleChange} required/>
                        <br/>
                        <Form.Control type="password" placeholder="password" value={this.state.password} name="password"
                                      onChange={this.handleChange} required/>
                        <br/>
                        <Button variant="primary" type="submit" block>Login</Button>
                    </Form.Group>
                </Form>
                <Link to="/register">Create an account!</Link>
            </div>
        );
    }
}
export default withRouter(Login);
