import React from "react";
import {Button, Nav, Navbar} from "react-bootstrap";
import {Route, Switch, withRouter} from "react-router-dom";
import Cart from "./Cart";
import Shop from "./Shop";
import Bought from "./Bought";
import Orders from "./Orders";
import ProductEdit from "./ProductEdit";
import Users from "./Users";
import Details from "./Details";
import {SERVER_URL} from "./constants";

class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            isAdmin: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.goToCart = this.goToCart.bind(this);
        this.gotToShop = this.gotToShop.bind(this);
        this.goToBought = this.goToBought.bind(this);
        this.gotToOrders = this.gotToOrders.bind(this);
        this.gotToProducts = this.gotToProducts.bind(this);
        this.goToUsers = this.goToUsers.bind(this);
        this.goToDetails = this.goToDetails.bind(this);
    }

    componentDidMount() {
        fetch(SERVER_URL + '/account/me', {
            method: "GET",
            headers: {
                pin: localStorage.getItem("pin")
            }
        }).then(res => {
            res.json()
                .then(res => {
                    if (res.role === "ADMIN") {
                        this.setState({
                            user: res.user,
                            isAdmin: true
                        });
                    } else {
                        this.setState({
                            user: res.user
                        });
                    }
                })
        })
    }

    //log off
    handleClick(event) {
        event.preventDefault();
        const request = {
            pin: localStorage.getItem("pin"),
            user: this.state.user
        };

        fetch(SERVER_URL + "/account", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        })
            .then((response) => {
                if (response.status === 404) {
                } else if (response.status === 200) {
                    this.props.history.push("/");
                    localStorage.removeItem("pin");
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    goToCart() {
        this.props.history.push("/account/cart");
    }

    gotToShop() {
        this.props.history.push("/account/shop");
    }

    goToBought() {
        this.props.history.push("/account/bought");
    }

    gotToOrders() {
        this.props.history.push("/account/orders");
    }

    gotToProducts() {
        this.props.history.push("/account/products");
    }

    goToUsers() {
        this.props.history.push("/account/users")
    }

    goToDetails() {
        this.props.history.push("/account/details");
    }

    render() {
        const styleHeader = {
            padding: 20,
        };
        const bt = {
            marginRight: 40,
            width: 100
        };
        if (this.state.user) {
            return (
                <div style={styleHeader}>
                    {!this.state.isAdmin ?
                        <div>
                        <Navbar bg="dark" variant="dark" expand="sm" fixed="top">
                        <Nav className="m-auto">
                            <Nav.Item className="navbar-nav ml-auto text-center"><Button style={bt}  onClick={this.gotToShop}>Shop</Button></Nav.Item>
                            <Nav.Item className="navbar-nav ml-auto text-center"><Button style={bt} onClick={this.goToCart}>Cart</Button></Nav.Item>
                            <Nav.Item className="navbar-nav ml-auto text-center"><Button style={bt} onClick={this.goToBought}>Bought</Button></Nav.Item>
                            <Nav.Item className="navbar-nav ml-auto text-center"><Button style={bt} onClick={this.handleClick}>Log out</Button></Nav.Item>
                        </Nav>
                        </Navbar>
                            <Switch>
                                <Route path="/account/cart" render={(routeProps) => <Cart user={this.state.user}/>}/>
                                <Route path="/account/shop" render={(routeProps) => <Shop user={this.state.user}/>}/>
                                <Route path="/account/bought"
                                       render={(routeProps) => <Bought user={this.state.user}/>}/>
                            </Switch>
                        </div>
                        :

                        <div>
                            <Navbar bg="dark" variant="dark" expand="sm" fixed="top">
                                <Nav className="m-auto">
                                    <Nav.Item className="navbar-nav ml-auto text-center"><Button variant="danger" style={bt} onClick={this.gotToOrders}>Orders</Button></Nav.Item>
                                    <Nav.Item className="navbar-nav ml-auto text-center"><Button variant="danger" style={bt} onClick={this.goToDetails}>Details</Button></Nav.Item>
                                    <Nav.Item className="navbar-nav ml-auto text-center"><Button variant="danger" style={bt} onClick={this.gotToProducts}>Products</Button></Nav.Item>
                                    <Nav.Item className="navbar-nav ml-auto text-center"><Button variant="danger" style={bt} onClick={this.goToUsers}>Users</Button></Nav.Item>
                                    <Nav.Item className="navbar-nav ml-auto text-center"><Button variant="danger" style={bt} onClick={this.handleClick}>Log out</Button></Nav.Item>
                                </Nav>
                            </Navbar>
                            <Switch>
                                <Route path="/account/orders"
                                       render={(routeProps) => <Orders user={this.state.user}/>}/>
                                <Route path="/account/details"
                                       render={(routeProps) => <Details user={this.state.user}/>}/>
                                <Route path="/account/products"
                                       render={(routeProps) => <ProductEdit user={this.state.user}/>}/>
                                <Route path="/account/users" render={(routeProps) => <Users user={this.state.user}/>}/>
                            </Switch>
                        </div>}
                </div>
            );
        } else return null;

    }
}

export default withRouter(Account);
