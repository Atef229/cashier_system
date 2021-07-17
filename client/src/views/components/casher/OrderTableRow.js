import React, { Component } from 'react';
import Moment from 'react-moment';
import axios from 'axios';
import { Button,  Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

 class OrdersTableRow extends Component {
    constructor(props) {
        super(props);
         
        this.state = {
            modal: false,
            danger: false,
            order:[]
          };

         this.toggleDanger = this.toggleDanger.bind(this);
         this.toggle = this.toggle.bind(this);

    }

    componentDidMount() {
        axios.get('/api/cart/all')
          .then(res => {
            this.setState({
              order: res.data
            });         
          })
          .catch((error) => {
            console.log(error);
          })
          console.log(this.state.order);
      }


      deleteProduct() {
        axios.delete('/api/cart/delete')
            .then((res) => 
            console.log('Product successfully deleted!')
            ).catch((error) => {
                console.log(error)
            })

    // Redirect to Dashboard
    window.location.href='/add-order';
    }
    

    totalPrice = () =>
    this.state.productPrice.reduce(
      (sum, product) => sum + this.state.quantity,
      0,
      console.log(this.state.quantity),
      console.log(this.state.price)
    )

    toggle() {
        this.setState({
          modal: !this.state.modal,
        });
      }

    toggleDanger() {
        this.setState({
          danger: !this.state.danger,
        });
      }

    render() {
      
        return (
            <tr>
                <td>{ this.props.obj.items.map((item, index) => (<div key={index}>{item.product.name}</div>)) }</td>
                {/* <td>{ this.props.obj.items.map((item, index) => (<div key={index}>{item.product.price}</div>)) }</td> */}
                <td>{ this.props.obj.items.map((item, index) => (<div key={index}>{item.quantity}</div>)) }</td>
                <td>{ this.props.obj.items.map((item, index) => (<div key={index}>{item.totalPrice}</div>)) }</td>
                <td>
                    <Button color="danger" onClick={this.toggleDanger} className="mr-1">حذف</Button></td>
                            <Modal isOpen={this.state.danger} toggle={this.toggleDanger}
                                className={'modal-danger ' + this.props.className}>
                            <ModalHeader toggle={this.toggleDanger}></ModalHeader>
                            <ModalBody><font size="6" text="center">هل تريد الحذف ؟</font></ModalBody>
                            <ModalFooter>
                                <Button color="danger" 
                                onClick={() => {
                                    this.deleteProduct();
                                    this.toggleDanger();
                                    window.location.href='/add-order'
                                }}
                                >حذف </Button>
                                <Button color="secondary" onClick={this.toggleDanger}>الغاء</Button>
                            </ModalFooter>
                            </Modal>
                        </tr>
        );
    }
}
export default OrdersTableRow;