import React, { Component } from 'react';
import axios from 'axios';
import {  CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import ExpensesTableRow from './ExpensesTableRow';
import Header from '../../../containers/DefaultLayout/DefaultHeader';
import DefaultFooter from '../../../containers/DefaultLayout/DefaultFooter';
import { Card, } from 'react-bootstrap';
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

export default class Expenses extends Component {

    constructor(props) {
      super(props)
      this.state = {
        expensess: []
      };
      
    }
  
  
  
    componentDidMount() {
      axios.get('api/expenses/all'+ this.props.location.search)
        .then(res => {
          this.setState({
            expensess: res.data
          });         
        })
        .catch((error) => {
          console.log(error);
        })
        
    }
    
  
    DataTable() {
      return this.state.expensess.map((res, i) => {
        return <ExpensesTableRow obj={res} key={i} />;
        
      });
    }

    //get total cost in array
    totalCosts = () =>
    this.state.expensess.map(function (expenses) {
        return expenses.cost;
    })

    //count total price
    TotalCosts = () =>
    this.totalCosts().reduce(
    (sum,total) => sum + total ,
    0,
    )
  
  
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
          <Card className="bg-dark text-white">
          <Card.Img src={'../../assets/img/joker.jpg'} //"https://merntask.s3.us-east-2.amazonaws.com/123456.jpg"
          alt="Card image"  height="350" width="130" />
          <Card.ImgOverlay>
          </Card.ImgOverlay>
        </Card>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>جميع المصروفات
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="md">
                  <thead>
                  <tr>
                  <th>اسم المستخدم</th>
                  <th>المبلغ</th>
                  <th>الملاحظات</th>
                    <th>التاريخ / الوقت</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.DataTable()}
                  <td></td>
                  <td style={{ color: 'DodgerBlue' }}>{this.TotalCosts()}</td>
                  <td></td>
                  <td></td>
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