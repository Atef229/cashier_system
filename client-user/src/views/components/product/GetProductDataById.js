import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Table,Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Card, Button,CardColumns,ListGroup,Container} from 'react-bootstrap';
import ProductsTableRow from './ProductsTableRow';
import PropTypes from 'prop-types';
import axios from 'axios';
import { getById } from '../../actions/ProductActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Header from '../../../containers/DefaultLayout/DefaultHeader';
import DefaultFooter from '../../../containers/DefaultLayout/DefaultFooter';
import {
  AppHeader,
  AppFooter,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
import navigation from '../../../_nav';

class GetProductDataById extends Component {

  constructor(props) {
    super(props) 
    this.state = {
      modal: false,
      danger: false,
      product: [],
      errors:{}
    };
  }

  componentDidMount() {
    axios.get('/api/product/' + this.props.match.params.product_id)
      .then(res => {
        this.setState({
          product: res.data
        });
      })
      .catch(err => this.setState({ errors: err.response.data }));
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }}


  render() {
    const { errors } = this.state;

    return (
      <div className="app">
      <AppHeader fixed> 
       <Header />
    </AppHeader>
    <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <AppSidebarNav navConfig={navigation} {...this.props} />
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
    <div className="app flex-row align-items-center" className="main">
    <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
            <CardColumns>
            {this.state.product.map((product) => (
        <Card className="m-4" key={product.id} style={{ width: "28rem" }}>
               <Card.Img variant="top" src={product.image} fluid={true} alt="image" 
              //  "https://merntask.s3.us-east-2.amazonaws.com/download0.jpg"
                onClick={() => {
                window.location.href='/user/product-data/'+ product.product_id
            }} />
             <Card.Body>
               <Card.Title>
               <h5> {product.name}</h5>
              </Card.Title>
              <ListGroup variant="flush">
              <ListGroup.Item>
               <Card.Text>
               <h5 style={{ color: 'DodgerBlue' }}>كود الصنف : {product.product_id}</h5>
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
 
    </Col>
          </Row>
        </Container>
      </div>
      </div>
            <AppFooter fixed>
            <DefaultFooter />
          </AppFooter>
          </div>
    );
  }
}

GetProductDataById.propTypes = {
  getById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { getById })(
  withRouter(GetProductDataById)
);
