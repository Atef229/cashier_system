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
            // <tr>
            //     <td>{this.props.obj.product_id}</td>
            //     <td>{this.props.obj.name}</td>
            //     <td>{this.props.obj.price}</td>
            //     <td>{this.props.obj.quantity}</td>
            //     <td>
            //     <Moment format="'DD/MM/YYYY''LTS'">{this.props.obj.Created_at}</Moment></td>
            //      <td>
            //         <Link className="edit-link" to={"update-product/" + this.props.obj.product_id}>
            //             Update Data 
            //         </Link>
            //         <br></br>
            //         <Link className="edit-link" to={"update-product-photos/" + this.props.obj.product_id}>
            //               Update Photos
            //         </Link>
            //         </td>
            //         <td>
            //         <Button color="danger" onClick={this.toggleDanger} className="mr-1">Delete</Button></td>
            //                 <Modal isOpen={this.state.danger} toggle={this.toggleDanger}
            //                     className={'modal-danger ' + this.props.className}>
            //                 <ModalHeader toggle={this.toggleDanger}>Delete Confirm</ModalHeader>
            //                 <ModalBody><font size="6" text="center">Are you sure?</font></ModalBody>
            //                 <ModalFooter>
            //                     <Button color="danger" 
            //                     onClick={() => {
            //                         this.deleteAdmin();
            //                         this.toggleDanger();
            //                         window.location.href='/#/dashboard'
            //                     }}
            //                     >Delete </Button>
            //                     <Button color="secondary" onClick={this.toggleDanger}>Cancel</Button>
            //                 </ModalFooter>
            //                 </Modal>
            //             </tr>
            // <CardDeck style={{display: 'flex', flexDirection: 'row'}}>
          //   <Card >
          //   <Card.Img variant="top" src="https://merntask.s3.us-east-2.amazonaws.com/download0.jpg" fluid={true} alt="Card image" />
          //   <Card.Body>
          //     <Card.Title>{this.props.obj.name}</Card.Title>
          //     <Card.Text>
          //       Some quick example text to build on the card title and make up the bulk of
          //       the card's content.
          //     </Card.Text>
          //     <Button variant="primary">Go somewhere</Button>
          //   </Card.Body>
          // </Card>
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