import React from "react";
import {Button, Modal} from "react-bootstrap";

class ModalFinish extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true
        };
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose(){
        this.setState({
            show: false
        });
        this.props.switchOff();
    }

    render() {
        return (
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>Are you sure you want to buy it?</Modal.Header>
                <Modal.Footer>
                    <Button onClick={this.props.buy}>Yes</Button>
                    <Button variant="secondary" onClick={this.handleClose}>No</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
export default ModalFinish;
