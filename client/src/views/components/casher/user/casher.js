import React, { Component } from 'react';
import {CardHeader,Label, FormGroup, FormFeedback, Button, CardBody, Col, Container, Form, Input, Row } from 'reactstrap';
import { Card,CardColumns,ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { withRouter,Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { addCart } from '../../../actions/addActions';
import SelectListGroup from '../../common/SelectListGroup';
import SelectListGroupProduct from '../../common/SelectListGroupProduct';
import axios from 'axios';
import Header from '../../../../containers/user/DefaultLayoutUser/DefaultHeader';
import DefaultFooter from '../../../../containers/user/DefaultLayoutUser/DefaultFooter';
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
import navigation from '../../../../nav_user';
import Orders from './Orders';

class AddCart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: '',
      product: '',
      quantity:'',
      products:[],
      productPrice:[],
      price:'',
      total_Wholesale_price: '',
      totalPrice:'',
      order:[],
      items:'',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  componentDidMount() {
    axios.get('/api/product/all')
      .then(res => {
        this.setState({
            products:res.data
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    axios.get(`/api/product/products/${e.target.value}`)
    .then(res => {
      this.setState({
        productPrice:res.data
      });
    })
    .catch((error) => {
      console.log(error);
    })
    console.log(this.state.productPrice);

    //this.state.quantity= `${e.target.value}`
  }

  totalPrice = () =>
  this.state.productPrice.reduce(
    (sum, product) => sum + this.state.quantity * product.price,
    0,
    console.log(this.state.quantity),
    console.log(this.state.price)
  )

  total_Wholesale_price = () =>
  this.state.productPrice.reduce(
    (sum, product) => sum + this.state.quantity * product.Wholesale_price,
    0,
    console.log(this.state.quantity),
    console.log(this.state.Wholesale_price)
  )

onSubmit(e) {
    e.preventDefault();
    const { isAuthenticated, user } = this.props.auth;

    const data = {
      product: this.state.product,
      quantity: this.state.quantity,
      username:user.username,
      price:this.state.price,
      totalPrice:this.state.totalPrice,
      total_Wholesale_price:this.total_Wholesale_price()
    };
    console.log(this.state.totalPrice);

this.props.addCart(data);
window.location.reload();

}


  render() {
    const { errors } = this.state;

    var style = {
      marginTop:"20px"
    }

    let options =
    this.state.products.map(function (product) {
     return { value: product.id, label: [product.name] };
   })

   let options1 = 
   this.state.productPrice.map(productPrice => {  
    return { value: productPrice.price, label: productPrice.price
   };
  });
      //console.log(this.product.price);

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
      <div className="align-items-center" className="main">
      <Card className="bg-dark text-white">
          <Card.Img src={'../../assets/img/joker.jpg'} //"https://merntask.s3.us-east-2.amazonaws.com/123456.jpg"
          alt="Card image"  height="350" width="130" />
          <Card.ImgOverlay>
          </Card.ImgOverlay>
        </Card>
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4" style={style}>
              <CardHeader>
                <strong>أضافة</strong> 
              </CardHeader>
                <CardBody className="p-4">
                  <Form noValidate onSubmit={this.onSubmit}>
                  <FormGroup>
                      <Label htmlFor="text">الصنف</Label>
                      <SelectListGroupProduct
                        placeholder="الصنف"
                        name="product"
                        value={this.state.product}
                        onChange={this.onChange}
                        options={options}
                        error={errors.product}                
                        />
                      <FormFeedback>{errors.cost}</FormFeedback>
                      </FormGroup>
                      <FormGroup>
                      <Label htmlFor="text">الكمية</Label>
                      <Input 
                      type="number" 
                      placeholder="الكمية"
                      name="quantity" 
                      value={this.state.quantity}
                      onChange={this.onChange}
                      invalid={errors.quantity}
                      valid={this.state.quantity}
                      />
                      <FormFeedback>{errors.quantity}</FormFeedback>
                      </FormGroup>
                      <FormGroup>
                      <Label htmlFor="text">سعر القطعه</Label>
                             {/* {this.state.productPrice.price}  */}
                        <SelectListGroup
                        placeholder="سعر القطعه"
                        name="price"
                        value={this.state.price}
                        onChange={this.onChange}
                        options={options1}
                        error={errors.price}                
                        />
                      </FormGroup>
                      <FormGroup>
                      <Label htmlFor="text">الاجمالى</Label>
                      <Input 
                      type="number" 
                      placeholder="الاجمالى"
                      name="totalPrice" 
                       value={this.state.totalPrice=this.totalPrice()}
                      //onChange={this.onChange}
                      />
                      </FormGroup>
                <Button type="submit" active block color="info" block >أضافة</Button>
                  </Form>
                </CardBody>
              </Card>

              <Orders />

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

AddCart.propTypes = {
  addCart: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  allcart: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  allcart: state.allcart
});

export default connect(mapStateToProps, { addCart })(withRouter(AddCart));