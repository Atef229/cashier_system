import React, { Component } from 'react';
import {CardHeader,Label, FormGroup, FormFeedback, Button, CardBody, Col, Container, Form, Input, Row } from 'reactstrap';
import { Card} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addExpenses } from '../../../actions/addActions';
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

class AddExpenses extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cost: '',
      notes: '',
      username:'',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

onChange(e) {
  this.setState({ [e.target.name]: e.target.value });
}

onSubmit(e) {
    e.preventDefault();
    const { isAuthenticated, user } = this.props.auth;

    const data = {
      cost: this.state.cost,
      notes: this.state.notes,
      username:user.username
    };

this.props.addExpenses(data, this.props.history.push('/user/dashboard'));

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
                <strong>أضافة مصروفات</strong> 
              </CardHeader>
                <CardBody className="p-4">
                  <Form noValidate onSubmit={this.onSubmit}>
                  <FormGroup>
                      <Label htmlFor="text">المبلغ</Label>
                      <Input 
                      placeholder="المبلغ" 
                      name="cost"
                      type="number"
                      value={this.state.cost}
                      onChange={this.onChange}
                      invalid={errors.cost}
                       valid={this.state.cost}
                      />
                      <FormFeedback>{errors.cost}</FormFeedback>
                      </FormGroup>
                      <FormGroup>
                      <Label htmlFor="text">ملحوظات</Label>
                      <Input 
                      type="textarea" 
                      placeholder="ملحوظات"
                      name="notes" 
                      value={this.state.notes}
                      onChange={this.onChange}
                      invalid={errors.notes}
                      valid={this.state.notes}
                      />
                      <FormFeedback>{errors.notes}</FormFeedback>
                      </FormGroup>
                <Button type="submit" active block color="info" block >أضافة</Button>
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

AddExpenses.propTypes = {
  addExpenses: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addExpenses })(withRouter(AddExpenses));