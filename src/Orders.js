import React from "react";
import {Button, Table} from "react-bootstrap";
import {SERVER_URL} from "./constants";

class Orders extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            orders: []
        };
        this.renderTable = this.renderTable.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
    }
    componentDidMount() {
        fetch(SERVER_URL+"/account/orders/all", {
            method: "GET",
            headers: {
                pin: localStorage.getItem("pin")
            }
        }).then(res => res.json().then(res => {
            this.setState({
                orders: res
            })
            }
        ))
    }

    renderTable() {
        let details = [];

        this.state.orders.map((el, index) => {
                    const localDateTime = el.localDateTime;
                    const date = localDateTime.substr(0,10);
                    const time = localDateTime.substr(11,5);
                    return details[details.length] = {orderid: el.id, userId: el.user.id, email: el.user.email,
                        firstName: el.user.firstName, lastName: el.user.lastName, address: el.address,
                        phone: el.phone, date: date+" "+time, status: el.status, toPay: el.toPay
                    };
                }
            );

        return details.map((el, index) => {
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{details[index].orderid}</td>
                    <td>{details[index].userId}</td>
                    <td>{details[index].email}</td>
                    <td>{details[index].firstName}</td>
                    <td>{details[index].lastName}</td>
                    <td>{details[index].address}</td>
                    <td>{details[index].phone}</td>
                    <td>{details[index].date}</td>
                    <td><span style={{color: "red"}}>{details[index].status}</span></td>
                    <td>{details[index].toPay}</td>
                    <td><Button onClick={() => this.changeStatus(details[index].orderid)}>Change status</Button></td>
                </tr>
            )
        });
    }

    changeStatus(index){
        fetch(SERVER_URL+"/account/orders/status/"+index, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                pin: localStorage.getItem("pin")
            }
        }).then( res => {
                if(res.status === 200)
                    this.componentDidMount()
            }
        )
    }

    render() {
        return (
            <div style={{marginTop: 60}}>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Order id</th>
                        <th>User id</th>
                        <th>Email</th>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Order's date</th>
                        <th>Status</th>
                        <th>To pay (zł)</th>
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
export default Orders;
