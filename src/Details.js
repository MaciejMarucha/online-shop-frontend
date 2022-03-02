import React from "react";
import {Table} from "react-bootstrap";
import {SERVER_URL} from "./constants";

class Details extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            details: []
        };
        this.renderTable = this.renderTable.bind(this);
    }

    componentDidMount() {
        fetch(SERVER_URL+"/account/orders/details", {
            method: "GET",
            headers: {
                pin: localStorage.getItem("pin")
            }
        }).then(res => res.json().then(res => {
            this.setState({
                details: res
            });
        }));
    }

    renderTable(){
        return this.state.details.map((el, index) => {
            return (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{el.id}</td>
                    <td>{el.order.id}</td>
                    <td>{el.product.id}</td>
                    <td>{el.product.name}</td>
                    <td>{el.amount}</td>
                    <td>{el.inTotal}</td>
                </tr>
            );
        })
    }

    render() {
        return (
            <div style={{marginTop: 60}}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Detail id</th>
                        <th>Order id</th>
                        <th>Product id</th>
                        <th>Product name</th>
                        <th>Amount</th>
                        <th>In total (zł)</th>
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
export default Details;
