import React, { Component } from 'react';
import {Label, FormGroup, FormFeedback, Button, CardBody, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Card,CardColumns,ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUsers } from '../../actions/authActions';
import Header from '../../../containers/DefaultLayout/DefaultHeader';
import DefaultFooter from '../../../containers/DefaultLayout/DefaultFooter';
import {
  AppHeader,
  AppFooter,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
import navigation from '../../../_nav';

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
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

    const data = {
      username: this.state.username,
      password: this.state.password
    };

this.props.registerUsers(data, this.props.history);

}


  render() {
    const { errors } = this.state;

    var style = {
      marginTop:"140px"
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
      <div className="app flex-row align-items-center" className="main" >
      <Card className="bg-dark text-white">
          <Card.Img src={'../../assets/img/joker.jpg'} //"https://merntask.s3.us-east-2.amazonaws.com/123456.jpg"
          alt="Card image"  height="350" width="130" />
          <Card.ImgOverlay>
          </Card.ImgOverlay>
        </Card>
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4" >
                <CardBody className="p-4">
                  <Form noValidate onSubmit={this.onSubmit}>
                   
                    <h4 className="text">اضافة مستخدم كاشير</h4>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input 
                     type="text" 
                     placeholder="اسم المستخدم"
                     name="username" 
                     value={this.state.username}
                     onChange={this.onChange}
                     invalid={errors.username}
                     valid={this.state.username}
                        />
                        <FormFeedback>{errors.username}</FormFeedback>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input 
                     type="password" 
                     placeholder="كلمة السر"
                     name="password" 
                     value={this.state.password}
                     onChange={this.onChange}
                     invalid={errors.password}
                     valid={this.state.password}
                        />
                        <FormFeedback>{errors.password}</FormFeedback>
                    </InputGroup>
                <Button type="submit" color="success" block >اضافة</Button>
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

Register.propTypes = {
  registerUsers: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUsers })(withRouter(Register));