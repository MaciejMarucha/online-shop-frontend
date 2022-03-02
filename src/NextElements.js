import React from "react";
import {Button, Form} from "react-bootstrap";
import ModalFinish from "./ModalFinish";
import {SERVER_URL} from "./constants";

class NextElements extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            firstName: "",
            lastName: "",
            address: "",
            phone: "",
            modal2: false,
            all: this.props.productData
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.buyy = this.buyy.bind(this);
    }

    buyy(){
        let detailss = [];
        this.state.all.map((el, index)=>{
            return detailss[index] = {product: el.product, amount: el.amount, inTotal: el.product.price * el.amount};
        });
        const order = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            email: this.state.email,
            phone: this.state.phone,
            toPay: this.props.toPay,
            user: this.props.user,
            details: detailss
        };
        fetch(SERVER_URL+"/account/cart/buy", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                pin: localStorage.getItem("pin")
            },
            body: JSON.stringify(order)
        }).then(res => {
            alert("Bought!");
            this.setState({
                modal2: false
            });
            this.props.switchOff();
        })
    }

    handleChange(event){
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(e){
        e.preventDefault();

        this.setState({
            modal2: true
        });
    }

    render() {
        let modal2;
        if (this.state.modal2) {
            modal2 = <ModalFinish buy={this.buyy} switchOff={(e) => this.setState({modal2: false})}/>
        }
            return (
                <div>
                    <Form onSubmit={this.handleSubmit}
                    >
                        <h6>Email</h6>
                        <Form.Control type="email" name="email" value={this.state.email} onChange={this.handleChange} required/>
                        <h6>Firstname</h6>
                        <Form.Control type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange}  pattern="^[A-Z]{1}[a-zA-ZąćęłńóśżźĄĆĘŁŃÓŚŻŹ]{1,20}$" required/>
                        <h6>Lastname</h6>
                        <Form.Control type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} pattern="^[A-Z]{1}[a-zA-ZąćęłńóśżźĄĆĘŁŃÓŚŻŹ]{1,30}$" required/>
                        <h6>Address</h6>
                        <Form.Control type="text" name="address" value={this.state.address} onChange={this.handleChange} required/>
                        <h6>Phone</h6>
                        <Form.Control type="tel" pattern="[0-9]{9}" name="phone" value={this.state.phone} onChange={this.handleChange} required/>
                        <Button type="submit">Buy!</Button>
                    </Form>
                    {modal2}
                </div>
            );
    }
}
export default NextElements;
