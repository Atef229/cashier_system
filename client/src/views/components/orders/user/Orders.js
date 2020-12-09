import React, { Component } from 'react';
import axios from 'axios';
import { CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { Card } from 'react-bootstrap';
//import queryString from 'query-string';
import OrdersTableRow from './OrdersTableRow';
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

export default class Orders extends Component {

    constructor(props) {
      super(props)
      this.state = {
        orders: []
      };
      
    }
  
  
  
    componentDidMount() {
      // let params = queryString.parse(this.props.location.search)
      // console.log(params)
      axios.get('/api/order/'+ this.props.location.search)
        .then(res => {
          this.setState({
            orders: res.data
          });     
        })
        .catch((error) => {
          console.log(error);
        })
        
    }

    componentWillUnmount() {
      this.state.orders
      //this.state.order
      
        }
    
  
    DataTable() {
      return this.state.orders.map((res, i) => {
        return <OrdersTableRow obj={res} key={i} />;
        
      });
    }

    //get total price in array
    totalPrice = () =>
    this.state.orders.map(function (order) {
        return order.totalPrice;
    })

    //count total price
    TotalPrice = () =>
    this.totalPrice().reduce(
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
          <AppSidebar display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <AppSidebarNav navConfig={navigation} {...this.props} />
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar> 
        <div className="animated fadeIn app row  col-md-9 m-auto justify-content-center"className="main">
        <Card className="bg-dark text-white">
          <Card.Img src={'../../assets/img/joker.jpg'} //"https://merntask.s3.us-east-2.amazonaws.com/123456.jpg"
          alt="Card image"  height="350" width="130" />
          <Card.ImgOverlay>
          </Card.ImgOverlay>
        </Card>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>المبيعات
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="md">
                  <thead>
                  <tr>
                  <th>التاريخ / الوقت</th>
                    <th>رقم الفاتورة</th>
                    <th>اسم المستخدم</th>
                    <th>الأصناف</th>
                    <th>اجمالى المبيعات</th>
                    <th>الملاحظات</th>
                    <th>تفاصيل الفاتورة</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.DataTable()}
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td style={{ color: 'DodgerBlue' }}>{this.TotalPrice()}</td>
                  <td></td>
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