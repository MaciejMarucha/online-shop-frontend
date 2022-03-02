import {withRouter} from "react-router-dom";
import React from "react";
import {Table} from "react-bootstrap";
import {SERVER_URL} from "./constants";

class Bought extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            orders: [],
        };
        this.renderTable = this.renderTable.bind(this);
    }
    componentDidMount() {
        fetch(SERVER_URL+"/account/orders", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                pin: localStorage.getItem("pin")
            },
            body: JSON.stringify(this.state.user)
        }).then(res => res.json().then(res => {
            this.setState({
                orders: res
            });
        })
        );
    }

    renderTable() {
        let details = [];

        this.state.orders.map((el, index) => {
            return el.details.map((el2) => {
                    const date = el.localDateTime;
                    const datee = date.substr(0,10);
                    const time = date.substr(11,5);
                    return details[details.length] = {orderid: el.id, name: el2.product.name, price: el2.product.price,
                        amount: el2.amount, inTotal: el2.inTotal, localDateTime: datee+" "+time, toPay: el.toPay, status: el.status
                    };
                }
            )
        });

        return details.map((el, index) => {
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{details[index].orderid}</td>
                    <td>{details[index].name}</td>
                    <td>{details[index].price}</td>
                    <td>{details[index].amount}</td>
                    <td>{details[index].inTotal}</td>
                    <td>{details[index].localDateTime}</td>
                    <td>{details[index].status}</td>
                </tr>
            )
        });
    }

    render() {
        return (
            <div style={{marginTop: 60}}>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Order id</th>
                        <th>Product name</th>
                        <th>Price for one</th>
                        <th>Amount</th>
                        <th>in total(zł)</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderTable()}
                    </tbody>
                </Table>
            </div>
        );
    }
}
export default withRouter(Bought);
