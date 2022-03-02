import React from "react";
import {Button, Modal} from "react-bootstrap";

class Modall extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            show: this.props.show
        };
        this.setShow = this.setShow.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.props.next();
        this.setState({
            show: false
        });
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
                <div>
                    <Modal show={this.state.show} onHide={() => this.setShow(false)}>
                        <Modal.Header closeButton>Next?</Modal.Header>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.setShow(false)}>No</Button>
                            <Button variant="primary" onClick={this.handleClick}>Yes</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                );
        }
        return null;
    }
}
export default Modall;
