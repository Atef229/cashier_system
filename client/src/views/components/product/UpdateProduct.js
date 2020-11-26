import React, { Component } from 'react';
import {CardHeader,Label, FormGroup, FormFeedback, Button, Card, CardBody, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateproduct } from '../../actions/ProductActions';
import axios from 'axios';
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

class UpdateProduct extends Component {

  constructor(props) {
    super(props);
    this.state = {
      product_id: '',
      name: '',
      Image: '',
      price: '',
      quantity: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }
  
  componentDidMount() {
    axios.put('/api/product/update/' + this.props.match.params.product_id)
      .then(res => {
        this.setState({
          product_id: res.data.product_id,
          name: res.data.name,
          price: res.data.price,
          quantity: res.data.quantity
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

  onChangeHandler=event=>{
    this.setState({
      Image: event.target.files[0],
      loaded: 0,
    })
  }

onChange(e) {
  this.setState({ [e.target.name]: e.target.value });
}

onSubmit(e) {
  e.preventDefault();

  const profileData = {
    product_id: this.state.product_id,
    name: this.state.name,
    price: this.state.price,
    quantity: this.state.quantity,
  };
  
  axios.put('/api/product/update/' + this.props.match.params.product_id, profileData)
  .then((res) => {
    console.log(res.data)
    this.props.history.push('/dashboard')
    console.clear()
  }).catch((error) => {
    console.log(error)
  })
  // this.props.updateproduct(profileData);
}


  render() {
    const { errors } = this.state;

    var style = {
      marginTop:"40px"
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
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4" style={style}>
              <CardHeader>
                <strong>تعديل بيانات صنف</strong> 
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
                      <Label htmlFor="text">السعر</Label>
                    <Input 
                     type="number" 
                     placeholder="السعر"
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
                <Button type="submit" color="success" block >تعديل صنف</Button>
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

UpdateProduct.propTypes = {
  updateproduct: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { updateproduct })(withRouter(UpdateProduct));