import React, { Component } from 'react';
import {FormFeedback,Button,CardBody,CardFooter,CardHeader,Form,FormGroup,Input,Label,Col, Container,Row} from 'reactstrap';
import { Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getOrderbyid } from '../../actions/OrdersActions';
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
 

class GetOrderById extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order_id: '',
      errors: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    axios.get('/api/order/')
      .then(res => {
        this.setState({
          orders:res.data
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
    }
    

  onSubmit = (e) => {
    e.preventDefault();
    const data = {
      order_id: this.state.order_id,
      errors:this.state.errors
    };

    axios.get('/api/order/orders/' + this.state.order_id,data)
.then(res => console.log(res.data))

.catch(err => this.setState({ errors: err.response.data }));

  // Redirect to order-data
    this.props.history.push('/get-order-data-by-id/' + this.state.order_id);
  
}


 
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
        <div className="animated fadeIn  justify-content-center"className="main">
        <Card className="bg-dark text-white">
          <Card.Img src={'../../assets/img/joker.jpg'} //"https://merntask.s3.us-east-2.amazonaws.com/123456.jpg"
          alt="Card image"  height="350" width="130" />
          <Card.ImgOverlay>
          </Card.ImgOverlay>
        </Card>
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="4">
        <Card>
          <CardHeader>
             <strong>البحث برقم الاوردر</strong>  
          </CardHeader>
          <CardBody>
            <Form action="" method="post" key="`${order_id}`" noValidate onSubmit={this.onSubmit}>
              <FormGroup>
                <Label htmlFor="nf-email">رقم الاوردر</Label>
                <Input 
                type="number" 
                placeholder="Enter order ID"
                name="order_id" 
                value={this.state.order_id}
                onChange={this.onChange}
                invalid={errors.order_id}
                valid={this.state.order_id}
                   />
                   <FormFeedback>{errors.order_id}</FormFeedback>
              </FormGroup>
            </Form>
          </CardBody>
          <CardFooter>
          <div class="row justify-content-center">
            <Button type="submit" size="md" color="primary"  onClick={this.onSubmit}>بحث</Button>
            </div>
          </CardFooter>
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

GetOrderById.propTypes = {
    getOrderbyid: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
  });
  
  export default connect(mapStateToProps, { getOrderbyid })(
    withRouter(GetOrderById)
  );