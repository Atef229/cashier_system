import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import axios from 'axios';
import { Button,  Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Card, CardDeck } from 'react-bootstrap';


 class ProductsTableRow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            danger: false,
          };

         this.toggleDanger = this.toggleDanger.bind(this);
         this.toggle = this.toggle.bind(this);
         
    }
    
  
    onSubmit(e) {
        e.preventDefault();
      // Redirect to Dashboard
      this.props.history.push('/dashboard')
    
      }

    deleteAdmin() {
        axios.delete('/api/product/delete/' + this.props.obj.product_id)
            .then((res) => 
            console.log('Product successfully deleted!')
                  // <Redirect  to='/dashboard' />
            ).catch((error) => {
                console.log(error)
            })

    // Redirect to Dashboard
       //this.props.history.push('/dashboard' );
    }

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
          <Card >
          <Card.Img variant="top" src="https://merntask.s3.us-east-2.amazonaws.com/download0.jpg" />

          <Card.Body>
            <Card.Title>{this.props.obj.name}</Card.Title>
            <Card.Text>{this.props.obj.price}</Card.Text>
            <Button variant="primary"  target="_blank">
              More Info
            </Button>
          </Card.Body>
        </Card>
          // </CardDeck>
          
        );
    }
}
export default ProductsTableRow;