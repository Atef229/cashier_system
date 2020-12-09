import React, { Component } from 'react';
import {FormFeedback,Button,CardBody,CardFooter,CardHeader,Form,FormGroup,Input,Label,Col, Container,Row} from 'reactstrap';
import { Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getExpenses } from '../../../actions/ExpensesActions';
import axios from 'axios';
import moment from 'moment'
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
 

class GetExpenses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Created_start: '',
      Created_end: '',
      errors: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    axios.get('/api/expenses/all')
      .then(res => {
        this.setState({
          expenses:res.data
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
      Created_start: this.state.Created_start,
      Created_end: this.state.Created_end,
    };

  // Redirect to orders-data
  this.props.history.push('/user/all-expenses/'+"?Created_start=" + moment(this.state.Created_start).format('MM/DD/YYYY')+'&Created_end='+moment(this.state.Created_end).format('MM/DD/YYYY'));
  
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
            <strong>تقرير المصروفات</strong> 
          </CardHeader>
          <CardBody>
            <Form action="" method="post" noValidate onSubmit={this.onSubmit}>
              <FormGroup>
                <Label htmlFor="nf-email">تاريخ البدء</Label>
                <Input 
                type="date" 
                placeholder="من"
                name="Created_start" 
                value={this.state.Created_start}
                onChange={this.onChange}
                invalid={errors.Created_start}
                valid={this.state.Created_start}
                   />
                   <FormFeedback>{errors.Created_start}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="nf-email">تاريخ الأنتهاء</Label>
                <Input
                type="date" 
                placeholder="الى"
                name="Created_end" 
                value={this.state.Created_end}
                onChange={this.onChange}
                invalid={errors.Created_end}
                valid={this.state.Created_end}
                   />
                   <FormFeedback>{errors.Created_end}</FormFeedback>
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

GetExpenses.propTypes = {
    getExpenses: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
  });
  
  export default connect(mapStateToProps, { getExpenses })(
    withRouter(GetExpenses)
  );