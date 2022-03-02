import React from "react";
import {Table} from "react-bootstrap";
import {SERVER_URL} from "./constants";

class Users extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
        this.renderTable = this.renderTable.bind(this);
    }
    componentDidMount() {
        fetch(SERVER_URL+"/account/users", {
            method: "GET",
            headers: {
                pin: localStorage.getItem("pin")
            }
        }).then(res => res.json().then(res => {
            this.setState({
                users: res
            });
        }))
    }

    renderTable(){
        return this.state.users.map((el, index) => {
            return (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{el.id}</td>
                    <td>{el.email}</td>
                    <td>{el.firstName}</td>
                    <td>{el.lastName}</td>
                </tr>
            );
        });
    }

    render() {
        return (
            <div style={{marginTop: 60}}>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>User id</th>
                        <th>Email</th>
                        <th>Firstname</th>
                        <th>Lastname</th>
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
export default Users;
