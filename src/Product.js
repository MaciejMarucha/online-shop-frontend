import React from "react";
import "./Product.css";
import {Button, Form} from "react-bootstrap";
import Alertt from "./Alertt";
import {SERVER_URL} from "./constants";

class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dane: this.props.dane,
            amount: 0,
            alert: false,
            user: this.props.user
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const products = {
            product: this.state.dane,
            amount: this.state.amount,
            user: this.state.user
        };

        let headers = new Headers();
        headers.append("pin", localStorage.getItem("pin"));
        headers.append('Content-Type', 'application/json');

        fetch(SERVER_URL+'/account/addtocart', {
            method: 'POST',
            headers: headers
            ,
            body: JSON.stringify(products)
        });

        this.setState({
            alert: true,
            amount: 0
        });
    }

    handleChange(event) {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    render() {
        let style = {
            height: 450,
            width: 450,
            padding: 0,
            boxShadow: "0px 0px 5px #666",
            display: "inline-block",
            marginLeft: 30,
            marginBottom: 30,
        };
        return (
            <div style={style}>
                <img src={ `data:image/jpeg;base64,${this.props.photo}`} alt={this.props.name}/>
                <p><b>{this.state.dane.name} {this.state.dane.price} zł</b></p>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Control value={this.state.amount} type="number" name="amount" min="1" max="100" onChange={this.handleChange} required/>
                    </Form.Group>
                    <Button type="submit">Add to cart</Button>
                </Form>
                {this.state.alert ? <Alertt show={this.state.alert} switchOff={(e) => this.setState({alert: false})}/> : null}
            </div>
        );
    }
}

export default Product;
