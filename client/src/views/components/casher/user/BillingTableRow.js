import React, { Component } from 'react';
import Moment from 'react-moment';
import axios from 'axios';
import { Button,  Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

 class BillingTableRow extends Component {

    constructor(props) {
        super(props);
         
        this.state = {
            order:[]
          };
    }
    

    // totalPrice = () =>
    // this.state.productPrice.reduce(
    //   (sum, product) => sum + this.state.quantity,
    //   0,
    //   console.log(this.state.quantity),
    //   console.log(this.state.price)
    // )

    render() {
        var td = {
            border: "1px solid black",
            //padding: "0.75rem",
            verticalAlign: "top"
          }
          var hr = {
            borderTop: "1px solid black"
          }
      
        return (       
            <tr style={td}>
                <td style={td}>{ this.props.obj.products.map((product, index) => (<div key={index}>{product.product.name}<hr style={hr}></hr></div>)) }</td>
                <td style={td}>{ this.props.obj.products.map((product, index) => (<div key={index}>{product.product.price}<hr style={hr}></hr></div>)) }</td>
                <td style={td}>{ this.props.obj.products.map((product, index) => (<div key={index}>{product.quantity}<hr style={hr}></hr></div>)) }</td>
                <td style={td}>{ this.props.obj.products.map((product, index) => (<div key={index}>{product.totalPrice}<hr style={hr}></hr></div>)) }
                {/* <hr></hr> */}
                {this.props.obj.totalPrice}</td>
                {/* <td>{this.props.obj.totalPrice}</td> */}
                        </tr>
        );
    }
}
export default BillingTableRow;