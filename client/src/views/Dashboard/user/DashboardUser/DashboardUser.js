import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Col, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import axios from 'axios';
import { Card, Button,CardColumns,ListGroup } from 'react-bootstrap';


class DashboardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: []
    };

  }

  componentDidMount() {
    axios.get('/api/product/all')
      .then(res => {
        this.setState({
          products: res.data
        }); 
        console.log(this.state.products)        
      })
      .catch((error) => {
        console.log(error);
      })
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
                window.location.href='/user/product-data/'+ product.product_id
            }}/>
             <Card.Body>
               <Card.Title>
               <h5> <Link className="edit-link" to={"/user/product-data/" + product.product_id}> 
                 {product.name}
              </Link></h5>
              </Card.Title>
              <ListGroup variant="flush">
              <ListGroup.Item>
               <Card.Text>
               <h5>سعر القطعه : {product.price}</h5>
                <h5>الكمية: {product.quantity}</h5>
               </Card.Text>
               </ListGroup.Item>
               </ListGroup>
               <ListGroup variant="flush">
              <ListGroup.Item>
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

export default DashboardUser;

