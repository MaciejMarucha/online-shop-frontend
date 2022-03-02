import React from "react";
import {Alert} from "react-bootstrap";

class Alertt extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            show: this.props.show
        };
        this.setShow = this.setShow.bind(this);
    }

    setShow(x){
        if(!x){
            this.props.switchOff();
        }
        this.setState({
            show: x
        });
    }

    render() {
        if(this.state.show){
            return (
                <div style={{position: "fixed", textAlign: "center"}}>
                <Alert variant="success" onClose={() => this.setShow(false)} dismissible>
                    <p>Added to cart</p>
                </Alert>
                </div>
            );
        }
        return null;
    }
}
export default Alertt;
