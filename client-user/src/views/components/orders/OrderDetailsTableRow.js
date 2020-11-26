import React, { Component } from 'react';
import Moment from 'react-moment';
import axios from 'axios';
import { Button,  Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

 class OrdersTableRow extends Component {
    constructor(props) {
        super(props);
         
        this.state = {
            orders:[]
          };
    }

    render() {
      
        return (
            <tr>
                <td>{ this.props.obj.products.map((product, index) => (<div key={index}>{product.product.name}<hr></hr></div>)) }</td>
                <td>{ this.props.obj.products.map((product, index) => (<div key={index}>{product.product.price}<hr></hr></div>)) }</td>
                <td>{ this.props.obj.products.map((product, index) => (<div key={index}>{product.quantity}<hr></hr></div>)) }</td>
                <td>{ this.props.obj.products.map((product, index) => (<div key={index}>{product.totalPrice}<hr></hr></div>)) }
                {this.props.obj.totalPrice}</td>
                        </tr>
        );
    }
}
export default OrdersTableRow;