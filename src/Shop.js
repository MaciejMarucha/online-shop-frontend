import React from "react";
import {withRouter} from "react-router-dom";
import Product from "./Product";
import {SERVER_URL} from "./constants";

class Shop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            products: [],
            photos: []
        };
        this.renderTable = this.renderTable.bind(this);
    }

    componentDidMount() {
        fetch(SERVER_URL+'/account/photos', {
            method: "GET",
            headers: {
                pin: localStorage.getItem("pin")
            }
        }).then(res => res.json().then(res => {
            let tab = [];
            res.map((el,index) => {
                tab[index] = atob(el.file);
            });

            this.setState({photos: tab});
        }));

        fetch(SERVER_URL+"/account/getproducts", {
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
        let tab = [];
        let tabProducts = [];
        let tabPhotos = [];

        this.state.products.map((el, index) => {
            return tabProducts[index] = {id: el.id, name: el.name, price: el.price};
        });

        this.state.photos.map((el,index) => {
            tabPhotos[index] = el;
        });

        this.state.products.map((el, index) => {
            tab.push(<Product key={index} photo={tabPhotos[index]}
                              dane={tabProducts[index]} user={this.state.user}/>);
        });
        return tab;
    }

    render() {
        const styles = {
            marginTop: 60
        };
        return (
            <div style={styles}>
                {this.state.products ? this.renderTable() : null}
            </div>
        );
    }
}

export default withRouter(Shop);
