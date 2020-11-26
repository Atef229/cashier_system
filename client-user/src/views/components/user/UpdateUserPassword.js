import React, { Component } from 'react';
import {FormFeedback,Button,Card,CardBody,CardFooter,CardHeader,Form,FormGroup,Input,Label} from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { updateprofile, getCurrentProfile } from '../../actions/UsersActions';
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

class UpdateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {

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

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;
      this.setState({
        password: profile.password,
      });
      
    }
    }

    onChange(e) {
      this.setState({ [e.target.name]: e.target.value });
    }
  
     onSubmit(e) {
      e.preventDefault();
  
      const profileData = {
        password: this.state.password,
      };
      
      axios.put('/api/user/update/password/' + this.props.match.params._id, profileData)
      .then((res) => {
        console.log(res.data)
        this.props.history.push('/dashboard')
        console.clear()
      }).catch(err => this.setState({ errors: err.response.data }));
      // this.props.updateprofile(profileData);
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
      <div className="animated fadeIn" dir="rtl"  className="col-md-4 m-auto justify-content-center">
            <Card>
              <CardHeader>
                <strong>تغيير كلمة السر</strong> 
              </CardHeader>
              <CardBody>
                <Form action="" method="post" key="`${_id}`" noValidate onSubmit={this.onSubmit}>
                  <FormGroup>
                    <Label htmlFor="nf-email">كلمة السر</Label>
                    <Input 
                    type="password" 
                    placeholder="ادخل كلمة السر"
                    name="password" 
                    value={this.state.password}
                    onChange={this.onChange}
                    invalid={errors.password}
                    valid={this.state.password}
                       />
                       <FormFeedback>{errors.password}</FormFeedback>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="lg" color="primary" className=" btn-block mt-2" onClick={this.onSubmit}>
                  <i className="fa fa-dot-circle-o"></i> تأكيد</Button>
              </CardFooter>
            </Card>              
      </div>
      </div>
      <AppFooter fixed>
          <DefaultFooter />
        </AppFooter>
      </div>
    );
  }
}

UpdateUser.propTypes = {
  updateprofile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { updateprofile, getCurrentProfile })(
  withRouter(UpdateUser)
);