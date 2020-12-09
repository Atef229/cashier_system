import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Col, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import axios from 'axios';
import { Card, Button,CardColumns,ListGroup } from 'react-bootstrap';


class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      danger: false,
      products: []
    };
    this.toggleDanger = this.toggleDanger.bind(this);
    this.toggle = this.toggle.bind(this);

  }

  componentDidMount() {
    axios.get('api/product/all')
      .then(res => {
        this.setState({
          products: res.data
        });       
      })
      .catch((error) => {
        console.log(error);
      })
  }

//   deleteUser() {
//     axios.delete('/api/product/delete/' + this.props.match.params.product_id)
//         .then((res) => 
//         console.log('Product successfully deleted!')
//         ).catch((error) => {
//             console.log(error)
//         })
// }

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
      <div className="d-flex align-items-start bd-highlight mb-3 example-parent">
          <Col>
          <Card className="bg-dark text-white">
          <Card.Img src={'../../assets/img/joker.jpg'} //"https://merntask.s3.us-east-2.amazonaws.com/123456.jpg"
          alt="Card image"  height="350" width="130" />
          <Card.ImgOverlay>
          </Card.ImgOverlay>
        </Card>
            <CardColumns>
      {this.state.products.map((product) => (
        <Card className="m-4" key={product.id} style={{ width: "20rem" }}>
               <Card.Img variant="top" src={product.image} fluid={true} alt="image" 
              //  "https://merntask.s3.us-east-2.amazonaws.com/download0.jpg"
                onClick={() => {
                window.location.href='/product-data/'+ product.product_id
            }} />
             <Card.Body>
               <Card.Title>
               <h5> <Link className="edit-link" to={"product-data/" + product.product_id}> 
                 {product.name}
              </Link></h5>
              </Card.Title>
              <ListGroup variant="flush">
              <ListGroup.Item>
               <Card.Text>
               {/* <h5 style={{ color: 'DodgerBlue' }}>كود الصنف : {product.product_id}</h5> */}
               <h5>سعر البيع : {product.price}</h5>
                <h5>الكمية: {product.quantity}</h5>
               </Card.Text>
               </ListGroup.Item>
               </ListGroup>
               <ListGroup variant="flush">
              <ListGroup.Item>
                <Button variant="success" size="sm"
                              onClick={() => {
                              window.location.href='/update-product/'+ product.product_id
                          }}
              >تعديل</Button> {' '}
              {/* <Button variant="danger" size="sm" onClick={this.toggleDanger}>حذف</Button>
              <Modal isOpen={this.state.danger} toggle={this.toggleDanger}
                  className={'modal-danger ' + this.props.className}>
              <ModalHeader toggle={this.toggleDanger}></ModalHeader>
              <ModalBody><font size="6" text="center">هل تريد الحذف ؟</font></ModalBody>
              <ModalFooter>
                  <Button variant="danger" 
                  onClick={() => {
                      this.deleteUser();
                      this.toggleDanger();
                      window.location.href='/dashboard'
                  }}
                  >حذف </Button>
                  <Button variant="secondary" onClick={this.toggleDanger}>الغاء</Button>
              </ModalFooter>
              </Modal> */}
              </ListGroup.Item>
            </ListGroup>
             </Card.Body>
        </Card>
        ))} 
    </CardColumns>
          {/* </CardDeck> */}
 
</Col>
        {/* </Row> */}
      </div>
    );
  }
}

export default Dashboard;

