import React, { Component } from 'react';
import { FormFeedback,Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginAdmin } from '../../actions/authActions';
import Header from '../../../containers/DefaultLayout/DefaultHeader';
import DefaultFooter from '../../../containers/DefaultLayout/DefaultFooter';
import {
  AppHeader,
  AppFooter,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';

class Login extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      username: this.state.username,
      password: this.state.password
    };
      
    this.props.loginAdmin(userData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
      <AppHeader fixed> 
       <Header />
    </AppHeader> 
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="5">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form noValidate onSubmit={this.onSubmit}>
                      <h1>تسجيل دخول الأدمن</h1>
                      <p className="text-muted">الدخول الى السيستم</p>
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
                      <InputGroup className="mb-4">
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
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-6">Login</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
      <AppFooter fixed>
          <DefaultFooter />
        </AppFooter>
      </div>
    );
  }
}

 Login.propTypes = {
   loginAdmin: PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired,
   errors: PropTypes.object.isRequired
 };
 
 const mapStateToProps = state => ({
   auth: state.auth,
   errors: state.errors
 });
 
 export default connect(mapStateToProps, { loginAdmin })(Login);