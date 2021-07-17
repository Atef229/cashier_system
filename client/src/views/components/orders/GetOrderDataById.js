import React, { Component } from 'react';
import axios from 'axios';
import { CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import OrdersTableRow from './OrdersTableRow';
import { getOrderbyid } from '../../actions/OrdersActions';
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

class GetOrderDataById extends Component {

    constructor(props) {
      super(props)
      this.state = {
        orders: [],
        totalPrice:[],
        totalProfit:[],
        errors:{}
      };
      
    }
  
  
  
    componentDidMount() {
      axios.get('/api/order/orders/'+ this.props.match.params.order_id)
        .then(res => {
          this.setState({
            orders: res.data
          }); 
        })
        .catch(err => this.setState({ errors: err.response.data }));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({ errors: nextProps.errors });
        }}
    
  
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

    //get total Profit in array
    totalProfit = () =>
    this.state.orders.map(function (order) {
        return order.Profit;
    })

    //count total Profit
    TotalProfit = () =>
    this.totalProfit().reduce(
    (sum,total) => sum + total ,
    0,
    )
  
    render() {

        const { errors } = this.state;
        
      return (
        <div className="app">
        <AppHeader> 
         <Header fixed/>
      </AppHeader>
      <div className="app-body">
          <AppSidebar  display="lg">
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
                <i className="fa fa-align-justify"></i>بيانات الاوردر
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="md">
                  <thead>
                  <tr>
                  <th>التاريخ / الوقت</th>
                    <th>رقم الفاتورة</th>
                    <th>اسم المستخدم</th>
                    <th>الأصناف</th>
                    <th>اجمالى السعر</th>
                    <th>اجمالى الربح</th>
                    <th>Remark</th>
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
                  <td style={{ color: 'ForestGreen' }}>{this.TotalProfit()}</td>
                  <td></td>
                  <td></td>
                  </tbody>
                  {errors.order_id} 
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

  GetOrderDataById.propTypes = {
    getOrderbyid: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
  });
  
  export default connect(mapStateToProps, { getOrderbyid })(
    withRouter(GetOrderDataById)
  );