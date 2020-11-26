import React, { Component } from 'react';
import {CardHeader,Label, FormGroup, FormFeedback, Button, CardBody, Col, Container, Form, Input, Row } from 'reactstrap';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addProduct } from '../../actions/addActions';
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

class AddProduct extends Component {

  constructor(props) {
    super(props);
    this.state = {
      product_id: '',
      name: '',
      Image: '',
      price: '',
      Wholesale_price: '',
      quantity: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }
  

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChangeHandler=event=>{
    this.setState({
      Image: event.target.files[0],
      loaded: 0,
    })
  }

onChange(e) {
  this.setState({ [e.target.name]: e.target.value });
}

  onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData()
    data.append('Image', this.state.Image)
    data.append('product_id', this.state.product_id)
    data.append('name', this.state.name)
    data.append('price', this.state.price)
    data.append('Wholesale_price', this.state.Wholesale_price)
    data.append('quantity', this.state.quantity)

this.props.addProduct(data, this.props.history);

}


  render() {
    const { errors } = this.state;

    var style = {
      marginTop:"20px"
    }


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
                <strong>اضافة صنف</strong> 
              </CardHeader>
                <CardBody className="p-4">
                  <Form noValidate onSubmit={this.onSubmit}>
                  <FormGroup>
                      <Label htmlFor="text">كود الصنف</Label>
                      <Input 
                      placeholder="كود الصنف" 
                      name="product_id"
                      type="number"
                      value={this.state.product_id}
                      onChange={this.onChange}
                      invalid={errors.product_id}
                       valid={this.state.product_id}
                      />
                      <FormFeedback>{errors.product_id}</FormFeedback>
                      </FormGroup>
                      <FormGroup>
                      <Label htmlFor="text">اسم الصنف</Label>
                      <Input 
                      type="text" 
                      placeholder="اسم الصنف"
                      name="name" 
                      value={this.state.name}
                      onChange={this.onChange}
                      invalid={errors.name}
                      valid={this.state.name}
                      />
                      <FormFeedback>{errors.name}</FormFeedback>
                      </FormGroup>
                      <FormGroup>
                      <Label htmlFor="text">سعر الجملة</Label>
                    <Input 
                     type="number" 
                     placeholder="سعر الجملة"
                     name="Wholesale_price" 
                     value={this.state.Wholesale_price}
                     onChange={this.onChange}
                     invalid={errors.Wholesale_price}
                     valid={this.state.Wholesale_price}
                        />
                    <FormFeedback>{errors.Wholesale_price}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="text">سعر البيع</Label>
                    <Input 
                     type="number" 
                     placeholder="سعر البيع"
                     name="price" 
                     value={this.state.price}
                     onChange={this.onChange}
                     invalid={errors.price}
                     valid={this.state.price}
                        />
                    <FormFeedback>{errors.price}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="text">الكمية</Label>
                    <Input 
                     type="text" 
                     placeholder="الكمية"
                     name="quantity" 
                     value={this.state.quantity}
                     onChange={this.onChange}
                     invalid={errors.quantity}
                     valid={this.state.quantity}
                        />
                    <FormFeedback>{errors.quantity}</FormFeedback>
                    </FormGroup>
                    <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="file-input" className="text-muted">صورة الصنف</Label>
                    </Col>
                    <Col xs="12" md="9">
                    <Input 
                      type="file"  
                      name="Image" 
                      onChange={this.onChangeHandler}
                      />
                      <Label className="text-muted">يجب اختيار صورة</Label>
                    </Col>
                    </FormGroup>
                <Button type="submit" color="success" block >اضافة صنف</Button>
                  </Form>
                </CardBody>
              </Card>
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

AddProduct.propTypes = {
  addProduct: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addProduct })(withRouter(AddProduct));