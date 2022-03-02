import {withRouter} from "react-router-dom";
import React from "react";
import {Button, Table} from "react-bootstrap";
import Modall from "./Modall";
import NextElements from "./NextElements";
import {SERVER_URL} from "./constants";

class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            products: [],
            toPay: 0,
            modal1: false,
            modal2: false,
            nextElements: false,
        };
        this.renderTable = this.renderTable.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
        this.next = this.next.bind(this);
        this.nextElementsTrue = this.nextElementsTrue.bind(this);
        this.showModal2 = this.showModal2.bind(this);
        this.reset = this.reset.bind(this);
    }

    componentDidMount() {
        let a = [];
        fetch(SERVER_URL+"/account/cart", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                pin: localStorage.getItem("pin")
            },
            body: JSON.stringify(this.state.user)
        }).then(res => res.json()
            .then(res => {
                let inTotal = 0;
                res.map((el, index) => {
                    inTotal += el.amount * el.product.price;
                    return a[index] = {id: el.id, product: el.product, amount: el.amount, user: el.user};
                });
                this.setState({
                    products: a,
                    toPay: inTotal
                });
            }
        ));
    }

    showModal2(){
        this.setState({modal2: true});
    }

    nextElementsTrue() {
        this.setState({
            nextElements: true,
        });
    }

    next() {
        if (this.state.products.length > 0) {
            this.setState({
                modal1: true
            });
        }
    }

    deleteAll() {
        if (this.state.products.length > 0) {
            fetch(SERVER_URL+"/account/cart", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    pin: localStorage.getItem("pin")
                },
                body: JSON.stringify(this.state.products)
            }).then(() => this.componentDidMount());
        }
    }

    removeItem(arg) {
        fetch(SERVER_URL+"/account/cart/" + arg.id, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                pin: localStorage.getItem("pin")
            },
            body: JSON.stringify(arg)
        }).then(() => this.componentDidMount());
    }

    renderTable() {
        return this.state.products.map((el, index) => {
            return (
                <tr key={el.id}>
                    <td>{index + 1}</td>
                    <td>{el.product.name}</td>
                    <td>{el.amount}</td>
                    <td>{el.product.price}</td>
                    <td>{el.amount * el.product.price}</td>
                    <td><Button variant="danger" onClick={(e) => this.removeItem(el, e)}>Remove</Button></td>
                </tr>
            )
        });
    }

    reset(){
        this.deleteAll();
        this.setState({nextElements: false});
    }

    render() {
        let modal1;
        if (this.state.modal1) {
            modal1 = <Modall show={this.state.modal1} switchOff={(e) => this.setState({modal1: false})} next={this.nextElementsTrue}/>;
        }
        return (
            <div style={{marginTop: 60}}>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Product name</th>
                        <th>Amount</th>
                        <th>Price for one </th>
                        <th>in total(zł)</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderTable()}
                    </tbody>
                </Table>
                <div style={{borderStyle: "solid", borderColor: "red", padding: 5}}>
                    In total: {this.state.toPay}zł
                    <div style={{display: "inline-block"}}>
                        <Button style={{marginLeft: 20}} variant="success" onClick={this.next}>Next!</Button>
                        <Button style={{marginLeft: 20}} variant="danger" onClick={this.deleteAll}>Delete all</Button>
                    </div>
                </div>
                {modal1}
                <div className="cart">
                </div>
                {this.state.nextElements ? <NextElements switchOff={(e) => this.reset(e)} toPay={this.state.toPay} user={this.state.user} productData={this.state.products}/>
                : null
                }
            </div>
        );
    }
}

export default withRouter(Cart);
