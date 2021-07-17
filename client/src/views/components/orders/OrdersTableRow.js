import React, { Component } from 'react';
import Moment from 'react-moment';
import axios from 'axios';
import { Button,  Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import OrderDetails from './OrderDetails';

 class OrdersTableRow extends Component {
    constructor(props) {
        super(props);
         
        this.state = {
            order:[],
            TotalPrice:[]
          };
    }

    componentDidMount() {
        axios.get('api/order/all')
          .then(res => {
            this.setState({
              order: res.data
            });        
          })
          .catch((error) => {
            console.log(error);
          })
      }

    render() {

        return (
            <tr>
                <td>{this.props.obj.Created_at}</td>
                <td>{this.props.obj.order_id}</td>
                <td>{this.props.obj.user}</td>
                <td>{ this.props.obj.products.map((product, index) => (<div key={index}>{product.product.name}</div>)) }</td>
                <td>{this.props.obj.totalPrice}</td>
                <td>{this.props.obj.Profit}</td>
                {/* <td>{this.props.obj.notes}</td> */}
                <td>
                    <Button onClick={() => {
                                    window.location.href='/order-details/'+this.props.obj.order_id
                                }} className="mr-1">تفاصيل الفاتورة</Button></td>
                        </tr>
        );
    }
}
export default OrdersTableRow;