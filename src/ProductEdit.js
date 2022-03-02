import React from "react";
import {Button, Form, Table} from "react-bootstrap";
import {SERVER_URL} from "./constants";

class ProductEdit extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            id: 0,
            name: "",
            price: 0,
            amountInWareHouse: 0,
            nameNew: "",
            priceNew: 0,
            amountInWareHouseNew: 0,
            file: null,
            photoId: -1
        };
        this.renderTable = this.renderTable.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.update = this.update.bind(this);
        this.addNew = this.addNew.bind(this);
        this.handleFile = this.handleFile.bind(this);

    }

    componentDidMount() {
        fetch(SERVER_URL+"/account/products/admin", {
            method: "GET",
            headers: {
                pin: localStorage.getItem("pin")
            }
        }).then(res => res.json().then(res => {
            this.setState({
                products: res
            });
        }));
    }

    renderTable(){
        return this.state.products.map((el, index) => {
            return (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{el.id}</td>
                    <td>{el.name}</td>
                    <td>{el.price}</td>
                    <td>{el.amountInWareHouse}</td>
                </tr>
            );
        });
    }

    update(e){
        e.preventDefault();
        const productRequest = {
            id: this.state.id,
            name: this.state.name,
            price: this.state.price,
            amountInWareHouse: this.state.amountInWareHouse
        };
        fetch(SERVER_URL+"/account/products/"+this.state.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                pin: localStorage.getItem("pin")
            },
            body: JSON.stringify(productRequest)
        }).then(res => {
            if(res.status === 200){
                this.setState({
                    id: 0,
                    name: "",
                    price: 0,
                    amountInWareHouse: 0
                });
                this.componentDidMount();
            }
        });
    }

    handleChange(event) {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    addNew(e){
        e.preventDefault();
        if(this.state.file !== null){
            const productRequest = {
                name: this.state.nameNew,
                price: this.state.priceNew,
                amountInWareHouse: this.state.amountInWareHouseNew,
                photo: {id: this.state.photoId}
            };
            fetch(SERVER_URL+"/account/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    pin: localStorage.getItem("pin")
                },
                body: JSON.stringify(productRequest)
            }).then(res => {
                if(res.status === 200){
                    this.setState({
                        nameNew: "",
                        priceNew: 0,
                        amountInWareHouseNew: 0,
                        file: null,
                        photoId: null
                    });
                    this.componentDidMount();
                }
            });
        } alert("Add product's photo!");
    }

    handleFile(e){
        e.preventDefault();
        const formData = new FormData();
        const a = e.target.files[0];
        formData.append("file", a);
        fetch(SERVER_URL+"/account/products/upload",{
            method: "POST",
            headers: {
                pin: localStorage.getItem("pin")
            },
            body: formData
        }).then(res => {

            if(res.status === 201){
                alert("Added photo!");
                res.text().then(res => {
                    this.setState({
                        file: a,
                        photoId: res
                    });
                    this.fileInput.value = "";
                })
            }
        })
    }

    render() {

        return (
            <div style={{marginTop: 70}}>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Product id</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Amount in warehouse</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderTable()}
                    </tbody>
                </Table>
                    <div style={{border: "1px solid gray" }}>
                        <Form onSubmit={this.update}>
                            <h2>Update product!</h2>
                            <h5>Enter product id</h5>
                            <Form.Control type="number" name="id" value={this.state.id} onChange={this.handleChange} required min="1" max="100" />
                            <h5>Enter new name</h5>
                            <Form.Control type="text" name="name" value={this.state.name} onChange={this.handleChange} required/>
                            <h5>Enter new price</h5>
                            <Form.Control type="number" name="price" value={this.state.price} onChange={this.handleChange} required/>
                            <h5>Enter new amount in warehouse</h5>
                            <Form.Control type="number" name="amountInWareHouse" value={this.state.amountInWareHouse} onChange={this.handleChange} required min="1" max="1000" />
                            <Button type="submit">Update!</Button>
                        </Form>
                    </div>
                    <br/>
                    <div style={{border: "1px solid gray" }}>
                        <Form onSubmit={this.addNew}>
                            <h2>Add new product!</h2>
                            <h5>Enter new name</h5>
                            <Form.Control type="text" name="nameNew" value={this.state.nameNew} onChange={this.handleChange} required/>
                            <h5>Enter new price</h5>
                            <Form.Control type="number" name="priceNew" value={this.state.priceNew} onChange={this.handleChange} required/>
                            <div>
                                <h5>Upload product photo</h5>
                                <input type="file" className="elo" name="file" ref={ref=> this.fileInput = ref} onChange={this.handleFile}/>
                                <br/>
                            </div>
                            <h5>Enter new amount in warehouse</h5>
                            <Form.Control style={{marginBottom: 10}} type="number" name="amountInWareHouseNew" value={this.state.amountInWareHouseNew} onChange={this.handleChange} required min="1" max="1000" />
                            <Button type="submit">Add new!</Button>
                        </Form>
                        </div>
                    </div>
        );
    }
}
export default ProductEdit;
