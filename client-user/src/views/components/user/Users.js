import React, { Component } from 'react';
import axios from 'axios';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import UsersTableRow from './UsersTableRow';
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

export default class Users extends Component {

    constructor(props) {
      super(props)
      this.state = {
        users: []
      };
      
    }
  
  
  
    componentDidMount() {
      axios.get('api/user/all')
        .then(res => {
          this.setState({
            users: res.data
          });         
        })
        .catch((error) => {
          console.log(error);
        })
        
    }
    
  
    DataTable() {
      return this.state.users.map((res, i) => {
        return <UsersTableRow obj={res} key={i} />;
        
      });
    }
  
  
    render() {
  
      return (
        <div className="app">
        <AppHeader> 
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
        <div className="animated fadeIn app row  col-md-9 m-auto justify-content-center"className="main">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>جميع مستخدمين الكاشير
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="md">
                  <thead>
                  <tr>
                  <th>اسم المستخدم</th>
                    <th>تاريخ الاضافه</th>
                    <th>تعديل كلمة السر</th>
                    <th>حذف</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.DataTable()}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
      </div>
      <AppFooter fixed>
          <DefaultFooter />
        </AppFooter>
      </div>
      );
    }
  }